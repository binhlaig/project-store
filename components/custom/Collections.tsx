"use client";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import Link from "next/link";
import Image from "next/image";

const Collections = () => {
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState<CollectionType | null>(null);
  const getcollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollection(data);
      setLoading(false);
    } catch (err) {
      console.log("[collection_GET]", err);
    }
  };
  useEffect(() => {
    getcollections();
  }, []);

  console.log(collection);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-bold  text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Collections
      </p>
      {!collection || collection.length === 0 ? (
        <p>Collection not found</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-16">
          {collection.map((collections: CollectionType) => (
            <Link href="/" key={collections._id}>
              <Image
                key={collections._id}
                src={collections.image}
                alt={collections.title}
                width={150}
                height={150}
                className="rounded-lg cursor-pointer"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
