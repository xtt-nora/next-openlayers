import { GradientPicker } from "@/components/GradientPicker";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import {
  GitBranchPlus,
  Save,
  Edit3,
  MoreVertical,
  Waypoints,
  Trash2,
  SquareArrowOutUpRight,
  ArrowDownToLine,
} from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useRouteplanModal } from "@/store/use-route-modal";
import { useQuery } from "convex/react";
import { useAddEvent } from "@/hooks/useAddEvent";
interface RoutePlanProps {
  mapid: any;
}
type RouteListItem = {
  _id: string;
  isEdit: boolean;
  isSelected: boolean;
  mapId: string;
  routeName: string;
  routerColor: string;
  routerGroup: Array<any>;
};

export const RoutePlan: React.FC<RoutePlanProps> = ({ mapid }) => {
  const list = [
    {
      icon: GitBranchPlus,
      title: "添加路线",
    },
    {
      icon: Save,
      title: "保存数据",
    },
  ];
  const { createLineEvent } = useAddEvent();
  const [routeList, setRouteList] = useState<RouteListItem[]>([]);
  const routeListData = useQuery(api.routeplan.get, { mapId: mapid as Id<"map"> });
  useEffect(() => {
    if (routeListData) setRouteList(routeListData);
  }, [routeListData]);

  // const [routeList, setRouteList] = useState([
  //   {
  //     routeName: "未知路线",
  //     id: 0,
  //     isEdit: false,
  //     isSelected: true,
  //     routerColor: "#409EFF",
  //     routerGroup: [
  //       { name: "TravelNote", point: {}, order: 1 },
  //       { name: "镰仓", point: {}, order: 2 },
  //       { name: "秋叶原", point: {}, order: 3 },
  //       { name: "银座", point: {}, order: 4 },
  //     ],
  //   },
  // ]);
  const { updateRouteplanId } = useRouteplanModal();
  const { mutate, pending } = useApiMutation(api.routeplan.addPlans);
  const clickEvent = (title: string) => {
    if (title === "保存数据") {
      console.log("保存数据");
    } else {
      // setRouteList((prevList) => [
      //   ...prevList,
      //   {
      //     routeName: "新建路线",
      //     isEdit: false,
      //     isSelected: false,
      //     routerColor: "#409EFF",
      //     routerGroup: [],
      //   },
      // ]);
      mutate({
        mapId: mapid,
        routeName: "新建路线",
        isEdit: false,
        isSelected: false,
        routerColor: "#409EFF",
        routerGroup: [],
      })
        .then((routeplanId: Id<"routeplan">) => {
          toast.info("Gig created successfully");
        })
        .catch(() => {
          toast.error("Failed to create gig");
        });
    }
  };

  const selectItem = (item: {
    routeName?: string;
    _id: any;
    isEdit?: boolean;
    isSelected?: boolean;
    routerColor?: string;
    routerGroup?: { name: string; point: {}; order: number }[];
  }) => {
    updateRouteplanId(item._id);
    setRouteList((prevList) =>
      prevList.map((i) => ({
        ...i,
        isSelected: i._id === item._id,
      }))
    );
  };

  const editName = (item: {
    routeName?: string;
    _id: any;
    isEdit?: boolean;
    isSelected?: boolean;
    routerColor?: string;
    routerGroup?: { name: string; point: {}; order: number }[];
  }) => {
    setRouteList((prevList) => prevList.map((i) => (i._id === item._id ? { ...i, isEdit: true } : i)));
  };

  const saveName = (
    item: {
      routeName?: string;
      _id: any;
      isEdit?: boolean;
      isSelected?: boolean;
      routerColor?: string;
      routerGroup?: { name: string; point: {}; order: number }[];
    },
    newName: string
  ) => {
    setRouteList((prevList) =>
      prevList.map((i) => (i._id === item._id ? { ...i, routeName: newName, isEdit: false } : i))
    );
  };
  const createLine = (item: {
    routeName?: string;
    _id: any;
    isEdit?: boolean;
    isSelected?: boolean;
    routerColor?: string;
    routerGroup?: { name: string; point: {}; order: number }[];
  }) => {
    createLineEvent(item);
  };
  const [background, setBackground] = useState("#B4D455");
  return (
    <div className="flex flex-col w-full h-full">
      <div className="h-5 w-full flex my-2.5 justify-between">
        {list.map((item, index) => (
          <div key={index} className="mx-2.5 cursor-pointer flex items-center" onClick={() => clickEvent(item.title)}>
            <item.icon size={18} />
            <span className="text-sm font-bold">{item.title}</span>
          </div>
        ))}
      </div>

      <div className="w-full h-[calc(100%-40px)] overflow-auto flex flex-col items-center">
        {routeList.map((item, index) => (
          <div key={index} className="w-64 border-b border-gray-300 mb-2.5" onClick={() => selectItem(item)}>
            <div
              className={`flex justify-between cursor-pointer mb-2.5 ${
                item.isSelected ? "border-l-4 border-green-500" : ""
              }`}
            >
              {item.isEdit ? (
                <input
                  type="text"
                  defaultValue={item.routeName}
                  className="flex-1 text-xs p-1 border"
                  onBlur={(e) => saveName(item, e.target.value)}
                />
              ) : (
                <div className="flex items-center overflow-hidden" onClick={() => editName(item)}>
                  <Edit3 size={18} />
                  <span className="text-xs truncate">{item.routeName}</span>
                </div>
              )}
              <div className="flex">
                <GradientPicker background={background} setBackground={setBackground} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <MoreVertical size={18} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>路线规划</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => createLine(item)}>
                        <Waypoints />
                        <span>形成路线</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 color="#f50000" />
                        <span>删除路线</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <SquareArrowOutUpRight />
                        <span>分享</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ArrowDownToLine />
                        <span>保存</span>
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="pl-5">
              {item.routerGroup.map((group, i) => (
                <div
                  key={i}
                  className="text-xs h-5 overflow-hidden whitespace-nowrap text-ellipsis mb-1 cursor-pointer hover:bg-gray-200"
                >
                  {group.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
