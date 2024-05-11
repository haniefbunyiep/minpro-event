// 'use client';
// import { useEffect } from 'react';
// import { useGetEvent } from '../../hooks/useGetEvent';
// import { CardEvent } from './../EventCard';

// export default function MapingEvent() {
//   const { data } = useGetEvent();

//   return (
//     <div>
//       {data?.data.data.map((value, index) => {
//         return (
//           <div key={index}>
//             <CardEvent
//               key={index}
//               name={value.name}
//               startDate={value.startDate}
//               time={value.time}
//               address={value.location.address}
//               city={value.location.city}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// }
