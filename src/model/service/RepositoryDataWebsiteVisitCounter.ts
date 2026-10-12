import IRepositoryData from "../interface/IRepositoryData.ts"
import db from "../repository/MongoDB.ts"

const _global_key = { name: "visit_count" };
const _collection = db?.collection("Data");

export default class RepositoryDataWebsiteVisitCounter implements IRepositoryData<string, number> {
	async Get(_k: string): Promise<number | null> {
		return (await _collection?.findOne(_global_key))?.value;
	}
	async BatchGet(_k: string[]): Promise<number[] | null> {
		throw EvalError("RepositoryDataWebsiteVisitCounter should not be used with BatchGet(...)");
	}
	async Set(_k: string, d: number): Promise<void> {
		await _collection?.updateOne(_global_key, { $set: { value: d } }, { upsert: true });
	}
	async BatchSet(_k: string[], _d: number[]): Promise<void> {
		throw EvalError("RepositoryDataWebsiteVisitCounter should not be used with BatchSet(...)");
	}
};