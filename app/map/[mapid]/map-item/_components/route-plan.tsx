import { GitBranchPlus, Save } from "lucide-react";
import { useState } from "react";

export const RoutePlan = () => {
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
  const [routeList, setRouteList] = useState([
    {
      routeName: "未知路线",
      id: 0,
      isEdit: false,
      isSelected: true,
      routerColor: "409EFF",
      routerGroup: [
        {
          name: "TravelNote",
          point: {},
          order: 1,
        },
        {
          name: "镰仓",
          point: {},
          order: 2,
        },
        {
          name: "秋叶原",
          point: {},
          order: 3,
        },
        {
          name: "银座",
          point: {},
          order: 4,
        },
      ],
    },
  ]);
  const clickEvent = (item: string) => {
    console.log(item, "item");
  };
  const selectItem = (item: { isSelected: boolean }) => {
    // routeList.forEach((route) => {
    //   route.isSelected = false;
    // });
    // setRouteList(routeList.map())
    item.isSelected = true;
  };
  return (
    <div className=" flex flex-col flex-nowrap w-full h-full">
      <div className="h-[20px] w-full flex flex-row flex-nowrap my-[10px] justify-between">
        {list.map((item, index) => (
          <div
            className="mx-[10px] cursor-pointer flex justify-center items-center"
            onClick={() => clickEvent(item.title)}
            key={index}
          >
            <item.icon size={24} />
            <span className="text-base/[14px] font-bold antialiased">{item.title}</span>
          </div>
        ))}
      </div>
      <div className="w-full h-[calc(100%-40px)] overflow-auto flex flex-col flex-nowrap flex-items-center">
        {routeList.map((item, index) => (
          <div
            className="w-250px border-b border-solid b-b-blueGray mb-10px"
            onClick={() => selectItem(item)}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
};
