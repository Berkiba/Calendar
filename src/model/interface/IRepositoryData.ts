export default interface IRepositoryData<K, D> {
	Get: (key: K) => Promise<D | null>;
	BatchGet: (keys: K[]) => Promise<D[] | null>;
	Set: (key: K, data: D) => Promise<void>;
	BatchSet: (keys: K[], datas: D[]) => Promise<void>;
}