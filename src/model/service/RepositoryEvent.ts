import { ObjectId } from "mongodb";

import db from "../repository/MongoDB.ts";

import type {
    Event,
    EventInput
} from "../interface/Event.ts";

//repository responsible for storing and retrieving events from MongoDB
export default class RepositoryEvent{

    //returns MongoDB collection containing events
    //if mongodb doesn't connect, throw error

    private collection(){
        if(!db){
            throw new Error("Database connection unavailable");
        }

        return db.collection<Event>("Events");
    }

    //retrieve all events stored in database
    //events are stored by date and starttime
    //mongodb's internal_id field is excluded for our own public event id

    async GetAll(): Promise<Event[]>{

        return this.collection()
            .find({}, {projection: {_id: 0}})
            .sort({date: 1, startTime: 1})
            .toArray();
    }

    //retrieve a single event using its unique id and returns null if it's not there
    async Get(id: string): Promise<Event | null> {
        return this.collection()
            .findOne({id}, {projection: {_id: 0}});
    }

    //create new event 
    //backend generates unique id, mongodb stores the whole event
    async Create(data: EventInput): Promise<Event>{

        const event: Event = {
            id: new ObjectId().toHexString(),
            ...data
        };

        //wait until mongodb has inserted the event
        await this.collection().insertOne(event);

        //return the new event to caller
        return event;
    }

}

