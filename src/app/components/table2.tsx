import React, {
    useCallback,
    useMemo,
    useRef,
    useState,
    StrictMode,
  } from "react";
  import { createRoot } from "react-dom/client";
  import { AgGridReact } from "@ag-grid-community/react";
  import "@ag-grid-community/styles/ag-grid.css";
  import "@ag-grid-community/styles/ag-theme-quartz.css";
  import "./styles.css";
  import {
    ColDef,
    ColGroupDef,
    GridApi,
    GridOptions,
    GridReadyEvent,
    ModuleRegistry,
    SideBarDef,
    createGrid,
  } from "@ag-grid-community/core";
  import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
  import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
  import { MenuModule } from "@ag-grid-enterprise/menu";
  import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
  import { SetFilterModule } from "@ag-grid-enterprise/set-filter";

  ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    ColumnsToolPanelModule,
    MenuModule,
    RowGroupingModule,
    SetFilterModule,
  ]);
   interface IOlympicData {
    athlete: string,
    age: number,
    country: string,
    year: number,
    date: string,
    sport: string,
    gold: number,
    silver: number,
    bronze: number,
    total: number
}
  const GridExample2 = () => {
    const containerStyle = useMemo(() => ({ width: "100%", height: "100vh" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState<IOlympicData[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
      { field: "athlete", minWidth: 170 },
      { field: "age" },
      { field: "country" },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
      return {
        editable: true,
        filter: true,
      };
    }, []);
  
    const onGridReady = useCallback((params: GridReadyEvent) => {
      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data: IOlympicData[]) => setRowData(data));
    }, []);
  
    return (
      <div style={containerStyle}>
        <div
          style={gridStyle}
          className={
            "ag-theme-quartz"
          }
        >
          <AgGridReact<IOlympicData>
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            sideBar={"columns"}
            onGridReady={onGridReady}
          />
        </div>
      </div>
    );
  };


export default GridExample2;