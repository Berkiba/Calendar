export default interface IRepositoryData<K, D> {
	Get: (key: K) => Promise<D | undefined>;
	BatchGet: (keys: K[]) => Promise<D[] | undefined>;
	Set: (key: K, data: D) => Promise<void>;
	BatchSet: (keys: K[], datas: D[]) => Promise<void>;
}