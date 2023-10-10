import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { User } from "@prisma/client";
import { toast, useToast } from "../hooks/useToast";

interface FavoriteButtonProps {
  productId: string;
  user: any;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ productId, user }) => {
  const favorites = user.favoriteIds || [];
  const [isFavorite, setIsFavorite] = useState(favorites.includes(productId));
  const {toast} = useToast()

  const { mutate: toggleFavorites } = useMutation({
    mutationFn: async () => {
      try {
        if (isFavorite) {
          await axios.delete("/api/unfavorite", { data: { productId } });
        } else {
          await axios.post("/api/favorite", { productId });
          toast({
            description: 'Added to wishlist',
            variant: "success",
          })
        }
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      setIsFavorite(!isFavorite);
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
