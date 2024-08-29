import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const SkeletonNewsCard: React.FC = () => {
  return (
    <Card className="overflow-hidden bg-gray-100 border-gray-300 ">
      <CardHeader className="p-0">
        <Skeleton className="h-48 w-full bg-gray-300" />
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24 bg-gray-200" />
          <Skeleton className="h-4 w-24 bg-gray-200" />
        </div>
        <Skeleton className="h-6 w-full bg-gray-200" />
        <Skeleton className="h-4 w-full bg-gray-200" />
        <Skeleton className="h-4 w-3/4 bg-gray-200" />
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <Skeleton className="h-6 w-16 rounded-full bg-gray-200" />
        <Skeleton className="h-4 w-24 bg-gray-200" />
      </CardFooter>
    </Card>
  );
};

export default SkeletonNewsCard;
