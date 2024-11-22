"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback } from "react";

interface CategoryP {
  title: string;
  description: string;
  image: string;
  label: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryP> = ({
  title,
  description,
  image,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="relative block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 cursor-pointer max-w-[22rem] sm:max-w-[24rem] md:max-w-[28rem] w-full h-auto"
  >
    <div className="relative w-full h-[24rem] md:h-[32rem]">
      <Image
        src={image}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-4 md:p-6">
      <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
        {title}
      </h3>
      <p className="text-white mt-1 sm:mt-2 text-sm sm:text-base">
        {description}
      </p>
    </div>
  </div>
);

const CategoriesSection: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();

  const handleCategoryClick = useCallback(
    (label: string) => {
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      };

      if (params?.get("category") === label) {
        delete updatedQuery.category;
      }

      const url = qs.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [params, router]
  );

  const categories: CategoryP[] = [
    {
      title: "Houses",
      description:
        "A house is a self-contained housing unit that occupies only part of a larger building.",
      image: "/images/Houses.png",
      label: "Houses",
      onClick: () => handleCategoryClick("House"),
    },
    {
      title: "Apartments",
      description:
        "An apartment is a self-contained housing unit that occupies only part of a larger building.",
      image: "/images/Apartments.png",
      label: "Apartments",
      onClick: () => handleCategoryClick("Apartment"),
    },
    {
      title: "Rooms",
      description:
        "A room is a self-contained housing unit that occupies only part of a larger building.",
      image: "/images/Rooms.png",
      label: "Rooms",
      onClick: () => handleCategoryClick("Room"),
    },
  ];

  return (
    <div className="text-center mt-20 md:mt-12 mb-20 md:mb-12 sm:py-12 px-4 sm:px-2 lg:px-16">
      <hr className="w-[60px] h-[5px] bg-emerald-800 rounded mx-auto mb-2" />
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        Categories
      </h2>
      <p className="text-base sm:text-lg md:text-xl mb-8">
        Explore the most popular categories.
      </p>
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
        {categories.map((category) => (
          <CategoryCard key={category.label} {...category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;