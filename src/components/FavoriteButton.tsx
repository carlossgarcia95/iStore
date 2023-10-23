"use client";

import React, { useMemo, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";
import { toast, useToast } from "../hooks/useToast";
import { set } from "lodash";
import { useRouter } from "next/navigation";
import { db } from "../lib/db";

interface FavoriteButtonProps {
  productId: string;
  user: any | undefined;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ productId, user }) => {
  const [favorites, setFavorites] = useState(user.favoriteIds || []);
  const [isFavorite, setIsFavorite] = useState(favorites.includes(productId));
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: toggleFavorites } = useMutation({
    mutationFn: async () => {
      try {
        if (isFavorite) {
          await axios.delete("/api/unfavorite", {
            data: { productId },
          });
          setIsFavorite(!isFavorite);
        } else {
          await axios.post("/api/favorite", { productId });
          toast({
            description: "Added to wishlist",
            variant: "success",
          });
          setIsFavorite(!isFavorite);
        }
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      if (isFavorite) {
        setFavorites([...favorites, productId]);
      } else {
        setFavorites(favorites.filter((id: any) => id !== productId));
      }
      router.refresh();
    },
  });

  const Icon = isFavorite ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      onClick={() => toggleFavorites()}
      className="hover:scale-125 cursor-pointer"
    >
      {isFavorite && <Icon size={25} className="text-red-500" />}
      {!isFavorite && <Icon size={25} />}
    </div>
  );
};

export default FavoriteButton;
