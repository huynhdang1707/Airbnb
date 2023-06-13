import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiPhongThue } from "../../apis/bnbApi";
import { apiViTri } from "../../apis/bnbApi";
import Card from "react-bootstrap/Card";
import ReactPaginate from "react-paginate";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.scss";

function Home() {
  const [phongThue, setPhongThue] = useState([]);
  const [viTri, setViTri] = useState([]);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;
  const navigate = useNavigate();

  const getPhongThue = async () => {
    try {
      setIsLoading(true);
      const data = await apiPhongThue();
      setPhongThue(data.content);
    } catch (error) {
      console.log(error);
      setErr(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPhongThue();
  }, []);

  const getViTri = async () => {
    try {
      setIsLoading(true);
      const data = await apiViTri();
      setViTri(data.content);
    } catch (error) {
      console.log(error);
      setErr(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getViTri();
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(phongThue.length / itemsPerPage);

  const displayData = phongThue
    .slice(offset, offset + itemsPerPage)
    .map((item, index) => { 
      const matchingViTri = viTri.find(
        (viTriItem) => viTriItem.id === item.maViTri
      );

      if (isLoading)
        return (
          <div className="h-100vh d-flex justify-content-center align-items-center">
            <img src="img/loading.gif" alt="" />
          </div>
        );  
      return (
        <Col className="my-2" key={index} sm={6} md={4} lg={3}>
          <Card
            className="hienThi"
            onClick={() => navigate(`/phong-thue/${item.id}`)}
          >
            <div>
              <Card.Img
                variant="top"
                className="hinhAnh"
                src={item.hinhAnh}
                alt={item.tenPhong}
              />
            </div>
            <Card.Body className="text-white mt-2 p-0">
              <a href="" className="text-start">
                <Card.Title className="tenPhong">
                  {matchingViTri
                    ? `${matchingViTri.tenViTri}, ${matchingViTri.tinhThanh}, ${matchingViTri.quocGia}`
                    : "Unknown Location"}
                </Card.Title>
                <Card.Text className="mt-1 fs-7 text-muted">
                  <p>
                    {item.moTa.length > 60
                      ? item.moTa.slice(0, 60) + " ..."
                      : item.moTa}
                  </p>
                  <h5 className="giaTien">{item.giaTien}.000.000đ</h5>
                </Card.Text>
              </a>
              <div className=""></div>
            </Card.Body>
          </Card>
        </Col>
      );
    });

  if (err) return null;

  return (
    <Container>
      <Row className="phongThue mt-4">{displayData}</Row>
      <div className="d-flex justify-content-center my-2 page">
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
          pageClassName="mx-2"
        />
      </div>
    </Container>
  );
}

export default Home;
