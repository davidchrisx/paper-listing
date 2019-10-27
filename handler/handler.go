package handler

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/globalsign/mgo/bson"
	"github.com/julienschmidt/httprouter"

	pl "github.com/davidchrisx/paper-listing"
	"github.com/davidchrisx/paper-listing/model"
)

type Handler struct {
	service *pl.Service
	Router  http.Handler
}

func New(service *pl.Service) *Handler {
	router := httprouter.New()
	handler := &Handler{service: service}
	router.POST("/listing", handler.Create)
	router.DELETE("/listing/:id", handler.Delete)
	router.GET("/listing/find/:address", handler.Find)
	router.GET("/listing", handler.GetAll)
	router.GET("/count", handler.Count)
	handler.Router = router
	return handler
}

func (h *Handler) Find(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	addr := params.ByName("address")

	records, err := h.service.GetListingWithAddress(addr)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(records)
}

func (h *Handler) Create(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	payload, _ := ioutil.ReadAll(r.Body)

	record := &model.Record{}
	json.Unmarshal(payload, &record)

	err := h.service.CreateListing(record)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		//json.NewEncoder(w).Encode(record)
		w.Write([]byte(err.Error()))
		return
	}
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("ok"))
}

func (h *Handler) GetAll(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	records, err := h.service.GetListing()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(records)

}

func (h *Handler) Delete(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	id := params.ByName("id")
	err := h.service.RemoveListing(bson.ObjectIdHex(id))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("ok"))
}

func (h *Handler) Count(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	count, err := h.service.CountListing()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(fmt.Sprintf("%d", count)))
}
