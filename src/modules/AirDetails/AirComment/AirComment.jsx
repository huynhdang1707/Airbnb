import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { apiBinhLuan, apiPhongID } from '../../../apis/bnbApi'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from "react-redux";
import { getInfoUser } from '../../../slices/infoUserSlice'
import "./AirComment.scss"

function AirComment({id}) {
    const [rating, setRating] = useState(0);

    const handleMouseOver = (starIndex) => {
      setRating(starIndex);
    };
  
    const handleMouseOut = () => {
        // Kiểm tra nếu rating là 0, thì không thay đổi giá trị
        if (rating === 0) {
          return;
        }
        setRating(rating);
      };
      
  
    const handleRatingClick = (starIndex) => {
      setRating(starIndex);
    };
  
    const renderStars = () => {
      const maxStars = 5;
      const stars = [];
  
      for (let i = 1; i <= maxStars; i++) {
        const starClass = i <= rating ? 'bi-star-fill' : 'bi-star';
  
        stars.push(
          <i
            key={i}
            className={`bi ${starClass}`}
            onMouseOver={() => handleMouseOver(i)}
            onMouseOut={handleMouseOut}
            onClick={() => handleRatingClick(i)}
          ></i>
        );
      }
  
      return stars;
    };
  

  return (
    <div className='batDau'>
        <Container>
            <h2 className='tieuDeNX'>ĐÁNH GIÁ PHÒNG</h2>
            <div className="rating-stars">{renderStars()}</div>
            <InputGroup className='mt-2'>
              <InputGroup.Text>Nhập đánh giá</InputGroup.Text>
              <Form.Control as="textarea" aria-label="With textarea" />
              <Button variant="outline-secondary" id="button-addon2">
                Đánh giá
              </Button>
            </InputGroup>
            <div className='mt-3'>
                <Row>
                    <Col>
                            <div>
                                <div className='mx-3 mt-3'>
                                    <span className='me-2'>
                                        <img src={"/img/mancity.png"} alt="" className="hinhAnh"/>
                                    </span>
                                    <span>Tên</span>
                                </div>
                                <div className='mx-3 mt-2'>
                                    <div>
                                        {/* {bl.saoBinhLuan >= 1 && bl.saoBinhLuan <= 5 && (
                                            <>
                                            {[...Array(bl.saoBinhLuan)].map((_, index) => (
                                                <i key={index} className="bi bi-star-fill"></i>
                                            ))}
                                            {[...Array(5 - bl.saoBinhLuan)].map((_, index) => (
                                                <i key={index} className="bi bi-star"></i>
                                            ))}
                                            </>
                                        )} */}
                                    </div>
                                    <div>Ngày Bình Luận</div>
                                    <div className='noiDung mt-3 pb-2'>Nội dung</div>
                                </div>
                            </div>
                    </Col>
                </Row>
            </div>
        </Container>
    </div>
  )
}

export default AirComment