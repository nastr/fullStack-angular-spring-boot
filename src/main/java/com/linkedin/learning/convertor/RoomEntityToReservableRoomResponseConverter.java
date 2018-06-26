package com.linkedin.learning.convertor;

import java.util.function.Function;

import com.linkedin.learning.entity.RoomEntity;
import com.linkedin.learning.model.Links;
import com.linkedin.learning.model.Self;
import com.linkedin.learning.model.response.ReservableRoomResponse;
import com.linkedin.learning.rest.ResourceConstants;
import org.springframework.core.convert.converter.Converter;

public class RoomEntityToReservableRoomResponseConverter implements
        Converter<RoomEntity, ReservableRoomResponse>,
        Function<RoomEntity, ReservableRoomResponse> {

    @Override
    public ReservableRoomResponse convert(RoomEntity source) {
        ReservableRoomResponse reservationResponse = new ReservableRoomResponse();
        if (null != source.getId())
            reservationResponse.setId(source.getId());
        reservationResponse.setRoomNumber(source.getRoomNumber());
        reservationResponse.setPrice(Integer.valueOf(source.getPrice()));

        Links links = new Links();
        Self self = new Self();
        self.setRef(ResourceConstants.ROOM_RESERVATION_V1 + "/" + source.getId());
        links.setSelf(self);

        reservationResponse.setLinks(links);

        return reservationResponse;
    }

    @Override
    public ReservableRoomResponse apply(RoomEntity source) {
        return convert(source);
    }
}
