import { useRouter } from "next/navigation";

import { Badge } from "@dingify/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@dingify/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@dingify/ui/components/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@dingify/ui/components/tabs";

import { UserBadge } from "@/components/UserBadge";
import { EventDashboardDetailsSheet } from "./EventDashboardDetailsSheet";

export default function EventsDashboardTable({
  events,
  setSelectedEventId,
  selectedEventId,
}) {
  const router = useRouter();

  const handleUserClick = (customerId) => {
    router.push(`dashboard/users/${customerId}`);
  };

  return (
    <>
      <Tabs defaultValue="week">
        <div className="flex items-center">
          {/* <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList> */}
          {/* <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="h-7 gap-1 text-sm"
                  size="sm"
                  variant="outline"
                >
                  <ListFilterIcon className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Fulfilled
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="h-7 gap-1 text-sm" size="sm" variant="outline">
              <FileIcon className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div> */}
        </div>
        <TabsContent value="week">
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
              <CardTitle>Events</CardTitle>
              <CardDescription>
                Monitor your app's real-time events.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden sm:table-cell">Timestamp</TableHead>
                    <TableHead className="hidden sm:table-cell">Provider</TableHead>
                    <TableHead className="hidden sm:table-cell">Providertype</TableHead>
                    <TableHead className="hidden sm:table-cell">UserID</TableHead>
                    <TableHead className="hidden sm:table-cell">Request</TableHead>
                    <TableHead className="hidden sm:table-cell">Response</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (

                    <TableRow
                      key={event.id}
                      onClick={() => setSelectedEventId(event.id)}
                      className={
                        selectedEventId === event.id ? "bg-accent" : ""
                      }
                    >
                      <TableCell className="hidden md:table-cell">
                        <div>
                          <div>{new Date(event.createdAt).toLocaleDateString()}</div>
                          <div>{new Date(event.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
                        </div>
                      </TableCell>

                      <TableCell>
                        {event.channel && event.channel.name && (
                          <div className="font-medium">
                            {event.channel.name}
                          </div>
                        )}
                        {/* {event.channel &&
                          event.channel.project &&
                          event.channel.project.name && (
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              {event.channel.project.name}
                            </div>
                          )} */}

                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div title={event.tags.providerType}>
                          {event.tags.providerType}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <UserBadge
                          customerId={event.customerId}
                          userId={event.userId}
                          onClick={handleUserClick}
                          variant={"secondary"}
                        />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div title={event.tags.content || ''}>
                          {event.tags.content && event.tags.content.length > 10 ? `${event.tags.content.slice(0, 5)}...${event.tags.content.slice(-5)}` : event.tags.content || 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {
                          event.tags.reqRes?
                          <div title={event.tags.reqRes ? JSON.stringify(event.tags.reqRes) : ''}>
                          {event.tags.reqRes &&
                            event.tags.reqRes.res &&
                            event.tags.reqRes.res.choices &&
                            event.tags.reqRes.res.choices[0] &&
                            event.tags.reqRes.res.choices[0].message &&
                            event.tags.reqRes.res.choices[0].message.content
                            ? (
                              event.tags.reqRes.res.choices[0].message.content.length > 10
                                ? `${event.tags.reqRes.res.choices[0].message.content.slice(0, 5)}...${event.tags.reqRes.res.choices[0].message.content.slice(-5)}`
                                : event.tags.reqRes.res.choices[0].message.content
                            )
                            : 'N/A'
                          }
                        </div>:"N/A"
                        }
                        

                      </TableCell>


                    </TableRow>
                  ))}
                </TableBody>
                {/* <EventDashboardDetailsSheet /> */}
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function ListFilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </svg>
  );
}
