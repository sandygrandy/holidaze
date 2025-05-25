import React, { useEffect, useState } from "react";
import { VenueCard } from "../components/venueCard";
import { fetchVenues, Venue } from "../api/venuesApi";
import { useDebouncedEffect } from "../helpers/useDebouncedEffect";
import { ApiResponseMetadata } from "../api/ApiResponse";
import { useSearchParams } from "react-router-dom";

function VenuesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(searchParams.get("page") ? parseInt(searchParams.get("page") as string, 10) : 1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [isLoading, setIsLoading] = useState(true);
  const [pageMetadata, setPageMetadata] = useState<ApiResponseMetadata>();

  const limit = 12;

  useEffect(() => {
    // Reset page to 1 when search query changes
    if (searchQuery) {
      setPage(1);
    }
  }, [searchQuery]);

  useEffect(() => {
    const newParams = { page: page.toString() };
    if (searchQuery) {
      newParams["search"] = searchQuery;
    }
    setSearchParams(newParams);
  }, [page, searchQuery]);

  useDebouncedEffect(() => {
    const loadVenues = async () => {
      try {
        setIsLoading(true);
        const res = await fetchVenues({
          page: page,
          limit: limit,
          search: searchQuery,
        })
        if (Array.isArray(res.data)) {
          setVenues(res.data);
        } else {
          setError("Unexpected response format.");
          console.error("An error occured:", res.data);
        }
        setPageMetadata(res.meta);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        setError("Failed to fetch venues.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadVenues();
  }, [page, searchQuery], 500);

  function handlePageChange(newPage: number) {
    if (newPage > 0) {
      setPage(newPage);
    }
  }

  return (
    <div className="px-10 md:px-wrapper pb-wrapper">
      <div className="venues-search-bar flex flex-col items-center gap-4">
        <div className="mt-10">
          <h2>Venues</h2>
        </div>
        <div className="items-baseline-last">
          <input
            type="text"
            placeholder="Search..."
            className="w-[40vw]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
        <div className="pagination-controls flex justify-center gap-4 mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={isLoading || !pageMetadata || page === 1}
            className="primary-button-light disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {page} / {pageMetadata?.pageCount}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={isLoading || !pageMetadata || pageMetadata.isLastPage}
            className="primary-button-light"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}

export default VenuesPage;
