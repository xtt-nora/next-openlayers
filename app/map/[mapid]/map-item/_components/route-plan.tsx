import { GitBranchPlus, Save } from "lucide-react";

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
  const clickEvent = (item: string) => {
    console.log(item, "item");
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
      <div className="w-full h-[calc(100%-40px)] overflow-auto flex flex-col flex-nowrap flex-items-center"></div>
    </div>
  );
};
