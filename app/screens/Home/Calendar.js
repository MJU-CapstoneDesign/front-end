import React,  from 'react';
import styled from 'styled-components/native';
import {
    StyleSheet,
} from 'react-native';
import AgendaCalendar from "../Calendars/AgendaCalendar";

const Container = styled.View`
  flex: 1;
`;

export default function Calendar() {
    return (
        <Container>
            <AgendaCalendar/>
        </Container>
    );
}
