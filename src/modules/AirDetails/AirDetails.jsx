<<<<<<< HEAD
import React from "react";
import { useParams } from "react-router-dom";
import AirInfo from "./AirInfo/AirInfo";
import AirIntro from "./AirIntro/AirIntro";
import { useState } from "react";
=======
import React from 'react'
import { useParams } from 'react-router-dom'
import AirInfo from './AirInfo/AirInfo';
import AirIntro from './AirIntro/AirIntro';
import AirComment from './AirComment/AirComment';
>>>>>>> origin/hnghiaaaa

function AirDetails() {
  const { id } = useParams();
  
  return (
    <>
<<<<<<< HEAD
      <AirIntro id={id} />
      <AirInfo id={id} />
=======
      <AirIntro id={id}/>
      <AirInfo id={id}/>
      <AirComment id={id}/>
>>>>>>> origin/hnghiaaaa
    </>
  );
}

export default AirDetails;
