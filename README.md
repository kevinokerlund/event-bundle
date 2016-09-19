# event-bundle

JavaScript library for organizing and managing DOM events in named bundles.

Take more control over events in your application by managin related events. For example, you could pause an entire
group of events while the user is in a particular state where they no longer need those events.

This library is UMD wrapped so it can be used with or without a module loader such as requireJS.

## Install
 
```shell 
npm i --save event-bundle 
```

## Example

```javascript
// store an EventBundle to a variable
var searchEvents = new EventBundle('search');

// add events to the bundle
searchEvents
    .add(window, 'keydown', someFunction)
    .add(searchInput, 'click', someOtherFunction);
    
// sometime later (for example when a modal opens)
searchEvents.pause();

// sometime event later (for example when a modal closes)
searchEvents.resume();
```

## Creating a new EventBundle
Create an individualized event bundle by using the EventBundle constructor. The `new` keyword is required to create a
new bundle.

```javascript
var bundle = new EventBundle('bundleName');
```

## Adding an event
Added events are attached to the element. You can add as many events as you want to a bundle. If that exact event
(same element, type, and callback) already exists on an element and belongs to another bundle, you will receive an
error.

This method returns the current bundle, which means you could chain other instance methods.

```javascript
bundle.add(element, type, callback, options);
```

## Removing an event
Removing events from the bundle also removes the event from the element.

```javascript
bundle.remove(element, type, callback, options);
```

## Pausing all events in a bundle
You can pause all of the events in bundle temporarily. If events are added to a bundle while it is "paused", those
events will automatically be in the "paused" state.

```javascript
bundle.pause();
```

## Resuming all events in a bundle
```javascript
bundle.resume();
```

## Removing all events from a bundle
While this method removes all the events from the bundle, it also removes all of the events from their elements.

There are two ways to do this. You can call `empty` on an EventBundle instance, or use the window EventBundle static
`empty` method.

Using the bundle instance:
```javascript
bundle.empty();
```

Using the static `empty` method:
```javascript
EventBundle.empty('bundleName');
```
A string is passed that is the name of a bundle.

## Get an EventBundle instance
If you do not have the EventBundle instance currently available to you, you can get an event bundle by name.

```javascript
EventBundle.get('bundleName');
```
A string is passed that represents the name of a particular bundle.

## Get an array of EventBundle names
This is a `getter` (not a function) on the EventBundle window object.
```javascript
EventBundle.bundleNames;
// returns an array of bundle names (ex: ['search', 'modal'])
```
