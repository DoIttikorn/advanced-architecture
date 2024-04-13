# event-store

มันคือการทำ event-sourcing ของตัว alarm

## Event Sourcing

คือ การเปลี่ยนข้อมูลเป็นแบบไก้ไขไม่ได้ (immuable) และจะบันทึกการเปลี่ยนแปลงของข้อมูลทุก state

- [publisher](./publishers/README.md)
- store `mongo-event-store.ts` เอาไว้จัดการ source ในการบันทึก state event โดยจะถูกเรียกใช้ผ่าน publisher
- bridge `events-bridge.ts`
- [deserializer](./deserializers/README.md)
- [schema](./schemas/README.md)
- [serializer](./serializers/README.md)
