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

    //updates existing event using unique event id
    async Update(id: string, data: EventInput): Promise<Event | null>{

        //find event by id and update info
        const result = await this.collection().updateOne({id}, {$set: data});

        //return null if no event was found
        if(result.matchedCount === 0){
            return null;
        }

        //retreive updated event from mongodb
        return await this.Get(id);
    }

    async Delete(id: string): Promise<boolean>{

        //find event by id and remove it from mongodb
        const result = await this.collection().deleteOne({id});

        //return true if an event was deleted, otherwise false
        return result.deletedCount > 0;
    }

}

