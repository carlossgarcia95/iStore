'use client'

import React, { useCallback, useMemo } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { getAuthSession } from "../lib/auth";
import axios from "axios";

interface FavoriteButtonProps {
  productId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ productId }) => {
  return (
    <div onClick={() => {}} className="hover:scale-125 cursor-pointer">
      <AiOutlineHeart size={25}/>
    </div>
  );
};

export default FavoriteButton;
