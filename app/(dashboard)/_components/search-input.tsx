"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import qs from "query-string";
import { useSearchModal } from "@/store/use-search-modal";

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const { updateSearch } = useSearchModal();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = async () => {
    updateSearch(value);
  };
  return (
    <div className="w-full relative flex">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input className="w-full pl-9" placeholder="Search trip..." value={value} onChange={handleChange} />
      <Button className="ml-2" onClick={handleSubmit}>
        Search
      </Button>
    </div>
  );
};
