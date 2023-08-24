import { IconButton, Tooltip } from "@mui/material";
import React, { memo } from "react";
import { utils, writeFile } from "xlsx";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
const ExcelExport = ({ userData, data, fileName }) => {
  const getYear = (yearNumber) => {
    switch (yearNumber) {
      case 1:
        return "One year";
      case 2:
        return "Two years";
      case 3:
        return "Three years";
      case 4:
        return "Four years";
      case 5:
        return "Five years";
      default:
        return "";
    }
  };
  const isAdmin = userData?.role === "Admin";

  const filteredData = isAdmin
    ? data?.filter((i) => i.role !== "Admin")
    : data?.filter(
        (i) =>
          i?.active === true &&
          i?.course === userData?.course &&
          i?.courseYear === userData?.courseYear
      );

  const UniqueData =
    fileName === "courses_records"
      ? filteredData?.map((item) => {
          const { __v, profileImage, course, years, ...filteredItem } = item;

          return {
            ...filteredItem,
            course: item?.course?.value,
            years: getYear(item?.years?.length),
          };
        })
      : filteredData?.map((obj) => ({
          ...obj,
          profileImage: null,
        }));

  const keysArray =
    UniqueData?.length > 0 && UniqueData[0]
      ? Object.keys(UniqueData[0]).filter((key) =>
          fileName === "courses_records"
            ? key !== "__v" && key !== "profileImage"
            : key !== "__v"
        )
      : [];

  const exportToExcel = () => {
    const headings = [keysArray];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, UniqueData, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <Tooltip title={"Export file"} placement="left">
      <IconButton color="primary" aria-label="export" onClick={exportToExcel}>
        <FileDownloadIcon />
      </IconButton>
    </Tooltip>
  );
};

export default memo(ExcelExport);
