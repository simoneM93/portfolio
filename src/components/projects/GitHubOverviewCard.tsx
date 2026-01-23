import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function GitHubOverviewCard({ reposCount }: { reposCount: number }) {
    return (
        <Card className="border-border/50 shadow-xl">
            <CardHeader>
                <CardTitle>GitHub Overview</CardTitle>
                <CardDescription>
                    Activity summary
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <p>
                    <strong>Public repositories:</strong> {reposCount}
                </p>
            </CardContent>
        </Card>
    );
}