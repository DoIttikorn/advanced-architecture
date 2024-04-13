import { EventClsRegistry } from '../infrastructure/event-store/event-cls.registry';
// ../infrastructure/event-store/event-cls.registry

// Decorator that registers an event class in the event class registry
// so that it can be deserialized later
export const AutowiredEvent: ClassDecorator = (target: any) => {
  EventClsRegistry.add(target);
};
