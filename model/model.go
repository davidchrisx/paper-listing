package model

import (
	"github.com/globalsign/mgo/bson"
)

type Record struct {
	ID bson.ObjectId `json:"id" bson:"_id,omitempty"`
	// Kategori Listing
	Category string `json:"category" bson:"category"`
	// Nama Pemilik
	OwnerName string `json:"owner_name" bson:"ownerName"`
	// Nomor Telepon
	PhoneNumber string `json:"phone_number" bson:"phoneNumber"`
	// Nama Agent
	AgentName string `json:"agent_name" bson:"agentName"`
	// Wilayah
	Region string `json:"region" bson:"region"`
	// Area
	Area string `json:"area" bson:"area"`
	//  Alamat
	Address string `json:"address" bson:"address"`
	// Luas Tanah
	Acreage float64 `json:"acreage" bson:"acreage"`
	// Luas Bangunan
	BuildingSize float64 `json:"building_size" bson:"buildingSize"`
	// Dimensi
	Dimension float64 `json:"dimension" bson:"dimension"`
	// Lantai
	Level float64 `json:"level" bson:"level"`
	// Kamar Tidur
	Bedroom float64 `json:"bedroom" bson:"bedroom"`
	// Kamar Mandi
	Bathroom float64 `json:"bathroom" bson:"bathroom"`
	// Direksi
	Direction string `json:"direction" bson:"direction"`
}

type Records struct {
	Records []*Record `json:"records"`
}
