const { expect } = require('chai');
const server = require('./../server/server');

const dbDataSource = server.dataSources.db;
const dbModels = server.models;
const { Person } = dbModels;

describe('Person model', () => {
  before(async () => {
    await dbDataSource.automigrate();
  });

  after(async () => {
    await dbDataSource.automigrate();
  });

  describe('CRUD', () => {
    it('Should create a new person', async () => {
      const newPerson = await Person.create({
        firstname: 'Oreofeoluwapo',
        surname: 'Olutola',
        email: 'oreofe.olutola@gmail.com',
        password: 'Thisisapassword',
      });

      expect(newPerson.id).to.be.a('number');
      expect(newPerson).to.have.property('firstname', 'Oreofeoluwapo');
      expect(newPerson).to.have.property('surname', 'Olutola');
    });

    it('Should be able to retrieve a person', async () => {
      const person = await Person.findById(1);

      expect(person.id).to.be.a('number');
      expect(person).to.have.property('firstname', 'Oreofeoluwapo');
      expect(person).to.have.property('surname', 'Olutola');
    });

    it('Should be able to update a person\'s information', async () => {
      const person = await Person.findById(1);
      const updatedPerson = await person.updateAttributes({
        firstname: 'Adetola',
        surname: 'Raphael',
      });
      expect(updatedPerson).to.have.property('firstname', 'Adetola');
      expect(updatedPerson).to.have.property('surname', 'Raphael');
    });

    it('Should be able to delete a user', async () => {
      await Person.deleteById(1);
      const person = await Person.findById(1);
      // eslint-disable-next-line no-unused-expressions
      expect(person).to.be.null;
    });
  });

  describe('Relationships', () => {
    let person;
    before(async () => {
      person = await Person.create({
        firstname: 'Oreofeoluwapo',
        surname: 'Olutola',
        email: 'oreofe.olutola@gmail.com',
        password: 'Thisisapassword',
      });
    });

    describe('Reviews', () => {
      it('person can create reviews', async () => {
        const review = await person.reviews.create({
          poiId: 2,
          rating: 5,
          comment: 'This is a comment',
        });

        expect(review).to.have.property('personId', person.id);
        expect(review).to.have.property('poiId', 2);
        expect(review).to.have.property('rating', 5);
        expect(review).to.have.property('comment', 'This is a comment');
      });
    });

    describe('Checkins', () => {
      it('person can create checkins', async () => {
        const date = new Date();
        const checkin = await person.checkins.create({
          poiId: 2,
          time: date,
        });

        expect(checkin).to.have.property('personId', person.id);
        expect(checkin).to.have.property('poiId', 2);
        expect(checkin).to.have.property('time');
      });
    });

    describe.skip('Favorites', () => {
      it('person can create favorites', async () => {
        await person.favorites.create();
      });
    });

    describe('Person Media', () => {
      it('person can create media', async () => {
        const personMedia = await person.personMedia.create({
          poiId: 2,
          mediaUrl: 'some random link here',
        });

        expect(personMedia).to.have.property('personId', person.id);
        expect(personMedia).to.have.property('poiId', 2);
        expect(personMedia).to.have.property('mediaUrl', 'some random link here');
      });
    });

    describe('POIs', () => {
      it('person can create poi', async () => {
        const poiRel = await person.pois.create({
          name: 'My POI\'s name',
          description: 'My POI\'s description',
          address: 'Olusoji Idowu Street, Off Ikorodu road, Lagos',
          coordinates: {
            lat: 6.553786,
            lng: 3.366187,
          },
          // merchantId: person.id,
        });

        expect(poiRel).to.have.property('name', 'My POI\'s name');
        expect(poiRel).to.have.property('description', 'My POI\'s description');
      });

      it('person can have multiple pois', async () => {
        const poiRel = await person.pois.create({
          name: 'My POI\'s 2nd name',
          description: 'My POI\'s 2nd description',
          address: 'Snt Finbarrs College road, Akoka, Lagos',
          coordinates: {
            lat: 6.524190,
            lng: 3.3855086,
          },
          // merchantId: person.id,
        });

        expect(poiRel).to.have.property('name', 'My POI\'s 2nd name');
        expect(poiRel).to.have.property('description', 'My POI\'s 2nd description');

        const pois = await person.pois();
        expect(pois).to.have.lengthOf(2);
      });
    });

    describe('Person follow', () => {
      let secondPerson;
      let personFollow;
      before(async () => {
        secondPerson = await Person.create({
          firstname: 'Adetola',
          surname: 'Raphael',
          email: 'adetola.raphael@yahoo.com',
          password: 'Thisisanotherpassword',
        });
      });

      it('should be able to follow another person', async () => {
        personFollow = await secondPerson.requesting.add(person);

        expect(personFollow).to.have.property('requesterId', secondPerson.id);
        expect(personFollow).to.have.property('requesteeId', person.id);
        // eslint-disable-next-line no-unused-expressions
        expect(personFollow.approved).to.be.false;
      });

      it('should not be able to re-follow a person', async () => {
        try {
          await person.requesting.add(secondPerson);
          // eslint-disable-next-line no-unused-expressions
          expect(true).to.be.false;
        } catch (err) {
          // eslint-disable-next-line no-unused-expressions
          expect(err).to.not.be.null;
        }
      });
    });
  });
});
