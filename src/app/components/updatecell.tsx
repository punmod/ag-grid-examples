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
  import {
    CellEditRequestEvent,
    ColDef,
    ColGroupDef,
    GetRowIdFunc,
    GetRowIdParams,
    GridApi,
    GridOptions,
    GridReadyEvent,
    ModuleRegistry,
    createGrid,
  } from "@ag-grid-community/core";
  import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
  
  ModuleRegistry.registerModules([ClientSideRowModelModule]);
  

  export interface IOlympicDataWithId extends IOlympicData {
    id: number;
}

export interface IOlympicData {
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



  const GridExampleUpdate = () => {
    const containerStyle = useMemo(() => ({ width: "100%", height: "600px" }), []);
    const gridStyle = useMemo(() => ({ height: "600", width: "100%" }), []);
    const [rowData, setRowData] = useState<IOlympicDataWithId[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
      { field: "athlete", minWidth: 160 },
      { field: "age" },
      { field: "country", minWidth: 140 },
      { field: "year" },
      { field: "date", minWidth: 140 },
      { field: "sport", minWidth: 160 },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
      return {
        flex: 1,
        minWidth: 100,
        editable: true,
      };
    }, []);
    const getRowId = useCallback((params: GetRowIdParams) => params.data.id, []);
  
    const onGridReady = useCallback((params: GridReadyEvent) => {
      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data: IOlympicDataWithId[]) => {
          data.forEach((item, index) => (item.id = index));
          setRowData(data);
        });
    }, []);
  
    const onCellEditRequest = useCallback((event: CellEditRequestEvent) => {
      const oldData = event.data;
      const field = event.colDef.field;
      const newValue = event.newValue;
      const newData = { ...oldData };
      newData[field!] = event.newValue;
      console.log("onCellEditRequest, updating " + field + " to " + newValue);
      console.log(newData)
      const tx = {
        update: [newData],
      };
      event.api.applyTransaction(tx);
    }, []);
  
    return (
      <div style={containerStyle}>
        <div
          style={gridStyle}
          className={
            "ag-theme-quartz"
          }
        >
          <AgGridReact<IOlympicDataWithId>
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            getRowId={getRowId}
            readOnlyEdit={true}
            onGridReady={onGridReady}
            onCellEditRequest={onCellEditRequest}
          />
        </div>
      </div>
    );
  };

  export default GridExampleUpdate;