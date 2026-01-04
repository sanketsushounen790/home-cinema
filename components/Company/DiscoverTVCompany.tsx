"use client";

import { useThemeStore } from "@/store/themeStore";
import LoadingCard from "../Shared_Components/LoadingCard";
import TVSerieCard from "../TVSerie/TVSerieCard";
import { useDiscoverTVByCompany } from "./hook/useDiscoverTVByCompany";

import { Building2 } from "lucide-react";
import { MapPin } from "lucide-react";
import { Globe } from "lucide-react";
import { Link } from "lucide-react";
import Image from "next/image";

import logoPlaceholder from "../../assets/logo_placeholder.jpg";

interface DiscoverTVCompanyProps {
  companyName: string;
  companyId: string;
  companyDetail: NetworkDetailResult;
  type: string;
}

const DiscoverTVCompany = ({
  companyName,
  companyId,
  companyDetail,
  type,
}: DiscoverTVCompanyProps) => {
  const { theme } = useThemeStore();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useDiscoverTVByCompany(companyId, companyName);

  const tvArraylength: number = data?.pages[0]?.results.length as number;

  return (
    <div className="w-full h-auto mt-7">
      <div className="flex flex-wrap justify-start items-end ml-7 gap-5 mb-6 mt-3">
        <div
          className={`flex flex-col justify-start items-center gap-4 p-2 font-bold text-[20px] shadow-lg ${
            theme === "light" ? "bg-base-300" : "bg-gray-400 text-black"
          } `}
        >
          {companyDetail.logo_path ? (
            <img
              src={`https://media.themoviedb.org/t/p/h60${companyDetail.logo_path}`}
              alt={companyDetail.name}
            />
          ) : (
            <Image
              src={logoPlaceholder}
              alt={companyDetail.name}
              className="w-[120px] h-[70px] bg-gray-300"
            />
          )}
        </div>

        {companyDetail.name && (
          <div className="flex justify-center items-center gap-2">
            <Building2 size={18} strokeWidth={2.5} />
            <p>{companyDetail.name}</p>
          </div>
        )}

        {companyDetail.origin_country && (
          <div className="flex justify-center items-center gap-2">
            <Globe size={18} strokeWidth={2.5} />

            <img
              src={`https://flagcdn.com/w320/${companyDetail.origin_country.toLowerCase()}.png`}
              alt={companyDetail.origin_country}
              className="w-5 h-4 rounded border"
            />
            <p>({companyDetail.origin_country})</p>
          </div>
        )}

        {companyDetail.headquarters && (
          <div className="flex justify-center items-center gap-2">
            <MapPin size={18} strokeWidth={2.5} />

            <p>{companyDetail.headquarters}</p>
          </div>
        )}

        {companyDetail.homepage && (
          <div className="flex justify-center items-center gap-2">
            <Link size={18} strokeWidth={2.5} />
            <a
              href={companyDetail.homepage}
              target="_blank"
              className="hover:underline"
            >
              Homepage
            </a>
          </div>
        )}
      </div>

      <div className="flex justify-start items-end ml-7 gap-5 mb-3 mt-3">
        {type === "tv" ? (
          <div className="font-bold text-[23px]">
            {data?.pages[0].total_results} Shows
          </div>
        ) : (
          <div className="font-bold text-[23px]">
            {data?.pages[0].total_results} Movies
          </div>
        )}
      </div>

      {isLoading ? (
        <div
          className={`grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mx-6 justify-center`}
        >
          {Array.from({ length: 20 }, (_, index) => index).map(
            (item, index) => (
              <div key={item} className="w-full">
                <LoadingCard />
              </div>
            )
          )}
        </div>
      ) : tvArraylength <= 5 ? (
        <div
          className={`w-[90%] flex flex-wrap justify-center lg:justify-start gap-6 mx-6`}
        >
          {data?.pages.map((page) =>
            page.results.map((result, index) => (
              <div key={index} className="w-[200px]">
                <TVSerieCard tv={result} />
              </div>
            ))
          )}
        </div>
      ) : (
        <div
          className={`grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 mx-6 justify-center`}
        >
          {data?.pages.map((page) =>
            page.results.map((result, index) => (
              <div key={index} className="w-full w-max-[200px]">
                <TVSerieCard tv={result} />
              </div>
            ))
          )}

          {hasNextPage && tvArraylength >= 20 && (
            <div className="w-full h-[300px] flex items-center justify-center rounded-lg shadow-lg bg-base-300">
              <button
                key={`loadmore-button`}
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer"
              >
                {isFetchingNextPage ? "Đang tải..." : "Xem thêm"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiscoverTVCompany;
