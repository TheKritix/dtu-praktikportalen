import {internshipListStore} from "./internship-list-store";

const internshipList = internshipListStore.internships

const [handleCheck, setHandleCheck] = useState({});

function filterbyCheckbox (value) {
    if (handleCheck !== undefined) {
        let filterKeys = [
            'filter_fridaybar',
            'filter_lunch',
            'filter_denmark',
            'filter_sweden',
            'filter_norway',
            'filter_remote',
            'filter_salary',
            'filter_no_salary'
            ]
        ;

        return filterKeys.every(function(key) {
            return !handleCheck[key] || value[key];
        });
    } else {
        return value;
    }
}