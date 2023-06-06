import React, { useState, useEffect } from 'react';
import { apiPhongThue } from '../../apis/bnbApi';
import { PhongThue } from '../../models/PhongThue';
import Card from 'react-bootstrap/Card';


function Home() {
  const [phongThue, setPhongThue] = useState<PhongThue[]>([]);
  const [err, setErr] = useState<Error | null>(null);

  const getPhongThue = async () => {
    try {
      const data = await apiPhongThue();
      setPhongThue(data.content);
    } catch (error) {
      console.log(error);
      setErr(err);
    }
  };

  useEffect(() => {
    getPhongThue();
  }, []);

  console.log(phongThue);

  if (err) return null;

  return (
    <div className="container">
      <div className="row">
        {phongThue.map((item, index) => (
          <div className="col-sm-3" key={index}>
            <Card>
              <div>
                <Card.Img variant="top" className="incomingMovieImg" src={item.hinhAnh} alt={item.tenPhong} />
              </div>
              <Card.Body className="text-white mt-2 p-0">
                <a href="" className="infoMovies text-start">
                  <Card.Title className="nameMovie">{item.tenPhong}</Card.Title>
                  <Card.Text className="mt-1 fs-7 text-muted">
                    {item.moTa.length > 60 ? item.moTa.slice(0, 60) + ' ...' : item.moTa}
                  </Card.Text>
                </a>
                <div className=""></div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
