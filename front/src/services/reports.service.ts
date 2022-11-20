import { Report } from "../models/Report";

const api_url = 'http://127.0.0.1:5000/'

export function markReport(isSus: string, id: string) {
    let formData = new FormData();
    formData.append('id', id);
    formData.append('state', isSus);

    return fetch(api_url + '/changestate', {
        method: 'POST',
        body: formData,
    });
}
export async function fetchReports() {
    let response = await fetch(api_url + '/susposts', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });

    let json = await response.json()

    return mapJson(json);
}

export async function fetchReportsByUser(userId: string) {
    let response = await fetch(api_url + `/susposts/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    let ඞ = await response.json()
    return mapJson(ඞ)
}

export async function getDistribution() {
    let response = await fetch(api_url + '/susposts/distribution', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });

    return await response.json();
}

export async function startTraining() {
    return await fetch(api_url + 'training', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });

}

function getFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}


function mapJson(json: any) {
    return json.map((rep: any) => (
        {
            id: rep._id,
            source: 'twitter',
            authorName: rep.author_name,
            authorId: rep.author_id,
            state: rep.state,
            text: rep.text,
            mediaUrl: rep.media_url,
            dateCreated: rep.created_at,
            textClassifier: rep.text_classification,
            phrases: rep.contains_malicious_phrases
        } as Report)) as Report[];

}