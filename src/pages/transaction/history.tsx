import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getTransactionHistory, TransactionRecord } from "../../api/service";
import { AlertError } from "../../utils/swal/swal";

const HistoryTransaction = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [records, setRecords] = useState<TransactionRecord[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [offset, setOffset] = useState(0);
  const limit = 5;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const newRecords = await getTransactionHistory(token!, offset, limit);
        if (newRecords.length < limit) {
          setHasMore(false);
        }
        setRecords((prev) => {
          const existingIds = new Set(prev.map((r) => r.invoice_number));
          const filtered = newRecords.filter(
            (r) => !existingIds.has(r.invoice_number)
          );
          return [...prev, ...filtered];
        });
      } catch (err) {
        console.error("Gagal ambil histori:", err);
        AlertError("Gagal mengambil histori transaksi");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [offset]);

  const handleShowMore = () => {
    const nextCount = visibleCount + limit;
    if (nextCount > records.length && hasMore) {
      setOffset((prev) => prev + limit);
    }

    setVisibleCount(nextCount);
  };

  const handleShowLess = () => {
    setVisibleCount((prev) => Math.max(5, prev - limit));
    if (records.length > visibleCount - limit) {
      setHasMore(true);
    }
  };

  const visibleRecords = records.slice(0, visibleCount);

  return (
    <div className="w-full min-h-screen bg-gray-100 py-10 px-4 md:px-20">
      <h2 className="text-2xl font-bold mb-6 text-center">Semua Transaksi</h2>
      <div className="space-y-6">
        {visibleRecords.map((t) => {
          const isTopup = t.transaction_type === "TOPUP";
          const amountColor = isTopup ? "text-green-600" : "text-red-600";
          const amountPrefix = isTopup ? "+" : "-";

          return (
            <div
              key={t.invoice_number}
              className="w-full bg-white rounded-lg shadow-md p-6"
            >
              <p className="text-sm text-gray-500">
                Invoice : {t.invoice_number}
              </p>
              <p className={`text-xl font-semibold ${amountColor}`}>
                {amountPrefix} Rp{t.total_amount.toLocaleString("id-ID")}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(t.created_on).toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                WIB
              </p>
              <p className="text-base mt-2">{t.description}</p>
            </div>
          );
        })}
      </div>

      {records.length > 0 && (
        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <button
            onClick={handleShowMore}
            disabled={loading || (!hasMore && visibleCount >= records.length)}
            className={`px-6 py-3 rounded-md text-white ${
              loading || (!hasMore && visibleCount >= records.length)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {loading ? "Memuat..." : "Show more"}
          </button>

          {visibleCount > 5 && (
            <button
              onClick={handleShowLess}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400"
            >
              Show less
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryTransaction;
