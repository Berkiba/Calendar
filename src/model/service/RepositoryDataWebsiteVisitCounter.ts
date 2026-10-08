import IRepositoryData from "../interface/IRepositoryData.ts"
import db from "../repository/MongoDB.ts"

const _global_key = { name: "visit_count" };
const _collection = db?.collection("Data");

export default class RepositoryDataWebsiteVisitCounter implements IRepositoryData<string, number> {
	async Get(k: string): Promise<number | undefined> {
		return (await _collection?.findOne(_global_key))?.value;
	}
	async BatchGet(k: string[]): Promise<number[] | undefined> {
		throw EvalError("RepositoryDataWebsiteVisitCounter should not be used with BatchGet(...)");
	}
	async Set(k: string, d: number): Promise<void> {
		await _collection?.updateOne(_global_key, { $set: { value: d } }, { upsert: true });
	}
	async BatchSet(k: string[], d: number[]): Promise<void> {
		throw EvalError("RepositoryDataWebsiteVisitCounter should not be used with BatchSet(...)");
	}
};