# Case List 

This app is a response to the challenge to 'Design a visually appealing and user friendly medical lab workflow system'.

***

## Installing

To run the app, simply enter the following two commands into your terminal.

```
yarn install
```
```
yarn start
```

_If you don't have yarn installed, [here's the doc site.](https://classic.yarnpkg.com/en/docs/install/#mac-stable)_

***

## Overview of Criteria

### Must have
All 'must have' criteria met.
- [x] Pleasant and intuitive UI
- [x] Image upload with annotations and general notes
- [x] Enforced case status transitions (optional statuses included)
- [x] Case list with filtering (and searching!)
- [x] Case edit/detail view

### Nice to have
Batting 50% on 'nice to have' criteria.
- [x] Database persistence
- [ ] User login

***
## Design decisions

- useContext instead of more robust state management for several reasons
    - The scope of this simple app is small enough that useContext's performance hit from extra rerenders is trivial
    - That said, re-rendering the whole table on search/filter is probably appropriate
    - Speed and simplicity of implementation let development move fast
    - Ultimately, excessive rerenders from context and prop drilling would prevent this approach from scaling.  This would be about the point in development that i would switch over to Redux/redux-toolkit or something more arcane like mobx.
- Material UI for aesthetically pleasant components
- Used `idb-keyval` for front end fake db.  This allowed me to focus on front end work and get a reasonable amount of database persistence.  Also it _is_ technically a __'Front-End Take-Home Test'.

- images are perhaps not obviously annotatable, but given the captive, long term user base design decisions like this are workable
- Image section will correctly determine the size of the image and scale and size accordingly

### Problems
-  Cloudinary widget is hugely unreliable
    - I tried adding the widget higher up in hierarchy and passing it down to get it to load sooner, with the improvement is not hugely noticeable.  In real life I'd use a more established solution like an AWS S3 bucket.
- Code Smell: Code to determine the color to status correlation is repeated with small variations several times
- Excessive prop drilling in places (specifically the CaseTable -> CaseRow -> CaseForm -> etc) leading to excessive rerenders and unnecessarily cognitively complex code.  Better foresight and planning would probably have led to each row managing its state with its own context (or just using Redux for the whole thing)
- Didn't utilize the theme object for consistent, central design factors (e.g. standardize padding). Not a significant issue given the small scope of the project, but the tech debt would quickly pile up (but would be a fairly small lift to fix)

### TODO
- Introduce robust state management solution, most likely Redux/Redux-toolkit
- Introduce validation to new case to make sure title is filled out
- User Table sorting (https://material-ui.com/components/tables/#sorting-amp-selecting)
- Add date created column (data is already in the model)
- Add very basic user creation, not even pw protected, just allow a user to track their own cases and choose if they are a regular user or a manager
- Add more robust user auth, using bcrypt to hash and salt passwords should mitigate the security concerns of idb-keyval
***
## Detail of Criteria

### Pleasant and intuitive UI

Used Material UI for aesthetically pleasant design components.

![What a great UI!](https://res.cloudinary.com/dkyipbwc4/image/upload/v1626619897/README%20Pictures/case_list_ui_ulnprj.png)

***

### Image upload with annotations and general notes

I tried using two unfamiliar APIs/SDKs for image uploading and annotating.  The Cloudinary widget is ___very___ unreliable to load, and I would not use it in another project. The `react-picture-annotate` package was great for providing a simple answer to the problem, but if the user's needs were in any way more complicated than drawing squares and writing some text (that doesn't allow for word wrap for some reason!), I would look for a more robust solution, possibly leveraging HTML5's fancy canvas.

#### Upload
Used [`Cloudinary`](https://cloudinary.com/) for image upload widget and service.  The widget doesn't reliably load in a timely manner, would not use again.

![Cloudinary widget actually showed up!](https://res.cloudinary.com/dkyipbwc4/image/upload/v1626620171/README%20Pictures/cloudinary_widget_qb0zsb.png)

#### Annotate
Used [`react-picture-annotation`](https://github.com/Kunduin/react-picture-annotation) for simple annotation.

![Annotate 1](https://res.cloudinary.com/dkyipbwc4/image/upload/v1626620809/README%20Pictures/annotate_1_nawiyw.png)
![Annotate 2](https://res.cloudinary.com/dkyipbwc4/image/upload/v1626620810/README%20Pictures/annotate_2_d0bmak.png)

***

### Enforced case status transitions

The statuses can only progress in the proscribed path (including optional):

```
                        --> Approved
                       /
Created -> Submitted -                
                       \
                        --> Rejected -> Resubmitted

              --> Approved
             /
Resbumitted -
             \ 
              --> Approved
                                   

```

***

### Case list with filtering (and searching!)

Filter buttons allow the user to filter by one or multiple statuses. Search bar allows search by title.

__No Filters or Search__
![No Filters](https://res.cloudinary.com/dkyipbwc4/image/upload/v1626622342/README%20Pictures/no_filters_rpqvza.png)

__One Filter__
![One Filter](https://res.cloudinary.com/dkyipbwc4/image/upload/v1626622342/README%20Pictures/1_filter_x2xshg.png)

__Two Filters__
![Two Filters](https://res.cloudinary.com/dkyipbwc4/image/upload/v1626622341/README%20Pictures/2_filters_esy0z4.png)

__Search by Title__
![Search by title](https://res.cloudinary.com/dkyipbwc4/image/upload/v1626622557/README%20Pictures/search_by_title_tjmtfz.png)

*** 
### Case edit/detail view

Clicking on any row opens the edit/detail form, allowing the user to edit the title, notes, images, and case status of the case.

***
### Database persistence

`idb-keyval` for front end db persistence.  Data will persist across refreshes but not if the cache is cleared.  I'm hoping this is 'clever' and not 'obviously cheating'. Can be seen in the `Application` tab of Chrome dev tools.

![Front end db](https://res.cloudinary.com/dkyipbwc4/image/upload/v1626622879/README%20Pictures/dev_console_idb-keyval_hmgger.png)