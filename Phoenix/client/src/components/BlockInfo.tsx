import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import React from 'react';
import { Separator } from "../components/ui/separator"
import { Label } from "@radix-ui/react-label";




export function BlockInfo() {
    return (
        <div className="flex flex-col items-center p-3">
            <h4 className="mb-2 text-sm font-medium leading-none">Number of spoilers avoided</h4>

            <Card className="h-[100px] w-[350px] rounded-md border p-4">
                <CardContent className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                        <p className="text-sm font-medium text-muted-foreground">
                            Today
                        </p>
                        <p className="text-xl font-bold text-primary">
                            10
                        </p>
                    </div>
                    <Separator orientation="vertical" className="h-full mx-4" />
                    <div className="flex flex-col items-center">
                        <p className="text-sm font-medium text-muted-foreground">
                            Total
                        </p>
                        <p className="text-xl font-bold text-primary">
                            40
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}