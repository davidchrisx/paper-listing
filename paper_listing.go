package paper_listing

import (
	"github.com/davidchrisx/paper-listing/model"
	"github.com/globalsign/mgo/bson"
)

type Storage interface {
	Find(bson.ObjectId) (*model.Record, error)
	FindAddress(string) ([]*model.Record, error)
	FindAll() ([]*model.Record, error)
	Delete(bson.ObjectId) error
	Update(*model.Record) error
	Create(*model.Record) error
	Count() (int, error)
}

type Service struct {
	storage Storage
}

func NewService(storage Storage) *Service {
	return &Service{
		storage: storage,
	}
}

func (s *Service) GetListingWithAddress(address string) ([]*model.Record, error) {
	return s.storage.FindAddress(address)
}

func (s *Service) GetListing() ([]*model.Record, error) {
	return s.storage.FindAll()
}

func (s *Service) RemoveListing(id bson.ObjectId) error {
	return s.storage.Delete(id)
}

func (s *Service) CreateListing(record *model.Record) error {
	return s.storage.Create(record)
}

func (s *Service) CountListing() (int, error) {
	return s.storage.Count()
}
