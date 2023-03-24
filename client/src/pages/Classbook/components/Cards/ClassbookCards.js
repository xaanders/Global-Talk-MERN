import React, { useEffect, useState } from 'react'
import { Col, Container, Nav, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import classes from './ClassbookCards.module.css'
import ClassbookItem from './ClassbookItem';
import ClassbookPagItem from './ClassbookPagItem';
import NoCards from './NoCards';


function ClassbookCards({ words = [], wordHandler, textbook = true }) {
    const params = useParams();
    const dictionary = useSelector(state => state.user.userInfo.profile.dictionary) || [];
    const pageNumber = params.pageNumber || 1;
    const [currentPage, setCurrentPage] = useState(pageNumber);
    const currentLevel = !params.level ? 'a1' : params.level;

    const currentItems = words.filter(item => {
        if (textbook) {
            return item.level.toLowerCase() === currentLevel && !dictionary.includes(item.translation)
        } else {
            return item.level.toLowerCase() === currentLevel && dictionary.includes(item.translation);
        }
    });

    useEffect(() => {
        pageNumber && setCurrentPage(pageNumber)
        window.scrollTo(0, 0);

    }, [pageNumber]);

    //pagination
    const cardsPerPage = 4;
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = currentItems.slice(indexOfFirstCard, indexOfLastCard);

    const pagesAmount = [...Array(Math.ceil(currentItems.length / 3))].map((_, i) => i + 1);

    return (
        <section className={classes.cards}>
            <Container>
                <div className={`d-flex justify-content-center ${classes.box}`}>

                    <Row className={`${classes.rows} justify-content-center align-items-center`}>
                        {currentCards.length > 0 && currentCards.map((item, i) => {
                            return <Col className={classes.columns} xs='12' key={1 + i}>
                                <ClassbookItem item={item} wordHandler={wordHandler} textbook={textbook} />
                            </Col>
                        })}
                        {currentCards.length === 0 && textbook && <NoCards btn={false} message="You've lerned all the words from this section! Congratulations!" />}
                        {currentCards.length === 0 && !textbook && <NoCards btn={true} message="There are no cards added to this level..." />}
                    </Row>
                </div>

                <div className={classes.pagination}>
                    <Nav className="d-flex justify-content-center gap-3">
                        {pagesAmount.length > 1 && pagesAmount.map(item => <ClassbookPagItem item={item} level={currentLevel} key={item} />)}
                    </Nav>
                </div>
            </Container>
        </section>
    )
}

export default ClassbookCards

