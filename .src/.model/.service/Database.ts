import type IDatabase from "../.interface/IDatabase.ts"

export default class Database<K, D> {
	private _concrete: IDatabase<K, D>;
	constructor(concrete: IDatabase<K, D>) {
		this._concrete = concrete;
	}
	Get(key: K) {
		return this._concrete.Get(key);
	}
	GetAll(key: K) {
		return this._concrete.GetAll(key);
	}
	BatchGet(keys: [K]) {
		return this._concrete.BatchGet(keys);
	}
	Put(key: K, data: D) {
		this._concrete.Put(key, data);
	}
	BatchPut(keys: [K], datas: [D]) {
		this._concrete.BatchPut(keys, datas);
	}
}