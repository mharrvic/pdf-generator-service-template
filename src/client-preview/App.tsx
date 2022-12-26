import React from "react";

import { PDFViewer } from "@react-pdf/renderer";
import { Quixote } from "../template/pdf-template";

function App() {
  return (
    <PDFViewer height={800} width={1000}>
      <Quixote />
    </PDFViewer>
  );
}

export default App;
