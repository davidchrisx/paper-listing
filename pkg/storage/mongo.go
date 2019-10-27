package storage

import (
	"log"
	"os"

	"github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"

	pl "github.com/davidchrisx/paper-listing"
	"github.com/davidchrisx/paper-listing/model"
)

const (
	collectionName = "records"
)

func GetCollectionName() string {
	return collectionName
}

type Storage struct {
	logger  *log.Logger
	session *mgo.Session
}

// Find fetches a record from mongo according to the query criteria provided.
func (r *Storage) Find(recordID bson.ObjectId) (*model.Record, error) {
	session := r.session.Copy()
	defer session.Close()
	coll := session.DB("").C(collectionName)

	var record model.Record
	err := coll.Find(bson.M{"_id": recordID}).One(&record)
	if err != nil {
		r.logger.Printf("error: %v\n", err)
		return nil, err
	}
	return &record, nil
}

// FindAddress fetches a record from mongo according to address matching the regex
func (r *Storage) FindAddress(address string) ([]*model.Record, error) {
	session := r.session.Copy()
	defer session.Close()
	coll := session.DB("").C(collectionName)

	var records []*model.Record
	err := coll.Find(bson.M{"address": bson.M{"$regex": bson.RegEx{Pattern: address, Options: "i"}}}).All(&records)
	if err != nil {
		r.logger.Printf("error: %v\n", err)
		return nil, err
	}
	return records, nil
}

// Find fetches all records from the database. YES.. ALL! be careful.
func (r *Storage) FindAll() ([]*model.Record, error) {
	session := r.session.Copy()
	defer session.Close()
	coll := session.DB("").C(collectionName)

	var records []*model.Record
	err := coll.Find(nil).All(&records)
	if err != nil {
		r.logger.Printf("error: %v\n", err)
		return nil, err
	}
	return records, nil
}

// Delete deletes a record from mongo according to the query criteria provided.
func (r *Storage) Delete(recordID bson.ObjectId) error {
	session := r.session.Copy()
	defer session.Close()
	coll := session.DB("").C(collectionName)

	return coll.Remove(bson.M{"_id": recordID})
}

// Update updates an record.
func (r *Storage) Update(record *model.Record) error {
	session := r.session.Copy()
	defer session.Close()
	coll := session.DB("").C(collectionName)

	return coll.Update(bson.M{"_id": record.ID}, record)
}

// Create records in the database.
func (r *Storage) Create(record *model.Record) error {
	session := r.session.Copy()
	defer session.Close()
	coll := session.DB("").C(collectionName)
	err := coll.Insert(nil, record)
	if err != nil {
		return err
	}

	return nil
}

// Count counts documents for a given collection
func (r *Storage) Count() (int, error) {
	session := r.session.Copy()
	defer session.Close()
	coll := session.DB("").C(collectionName)
	return coll.Count()
}

// NewMongoSession dials mongodb and creates a session.
func newMongoSession() (*mgo.Session, error) {
	mongoURL := os.Getenv("MONGO_URL")
	if mongoURL == "" {
		mongoURL = "mongodb://admin:admin123@ds239578.mlab.com:39578/listing"
		//log.Fatal("MONGO_URL not provided")
	}
	return mgo.Dial(mongoURL)
}

func newStorageLogger() *log.Logger {
	return log.New(os.Stdout, "[mongoDB] ", 0)
}

func NewStorage() pl.Storage {
	logger := newStorageLogger()
	session, err := newMongoSession()
	if err != nil {
		logger.Fatalf("Could not connect to the database: %v\n", err)
	}

	return &Storage{
		session: session,
		logger:  logger,
	}
}
