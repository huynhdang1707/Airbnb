import React from "react";
import { useParams } from "react-router-dom";
import AirInfo from "./AirInfo/AirInfo";
import AirIntro from "./AirIntro/AirIntro";
import { useState } from "react";

function AirDetails() {
  const { id } = useParams();
  
  return (
    <>
      <AirIntro id={id} />
      <AirInfo id={id} />
    </>
  );
}

export default AirDetails;
