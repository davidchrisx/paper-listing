package main

import (
	"flag"
	"log"
	"net/http"
	"os"

	pl "github.com/davidchrisx/paper-listing"
	"github.com/davidchrisx/paper-listing/handler"
	"github.com/davidchrisx/paper-listing/pkg/storage"
)

func main() {
	httpPort := os.Getenv("PORT")
	if httpPort == "" {
		httpPort = ":4444"
	} else {
		httpPort = ":" + httpPort
	}

	flag.StringVar(&httpPort, "b", httpPort, "bind on port")
	flag.Parse()

	str := storage.NewStorage()
	service := pl.NewService(str)
	h := handler.New(service)

	log.Printf("Running on port %s\n", httpPort)
	log.Fatal(http.ListenAndServe(httpPort, h.Router))
}
