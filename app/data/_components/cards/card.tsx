import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

export default function SummariesCard<T extends ReactNode>({
  data,
  title,
  classes,
}: {
  data: T;
  title: string;
  classes?: string;
}) {
  return (
    <Card
      size="sm"
      className="mx-auto w-full max-w-sm rounded-sm w-50 h-20 mt-10"
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={classes}>{data}</p>
      </CardContent>
    </Card>
  );
}
