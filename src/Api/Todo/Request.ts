import {message} from 'antd';
import axios, {AxiosResponse} from 'axios';
import {Response, Todo} from '../../Class';
import {ADD, DELETE_BY_ID, GET_BY_PAGE, MODIFY, SWITCH_STATE} from './ROUTE';

export async function getByPage(pageNumber: number, pageSize: number): Promise<Array<Todo> | null>
{
    try
    {
        const {data: {isSuccessful, message: msg, data}}: AxiosResponse<Response<Array<Todo>>> = await axios.get(GET_BY_PAGE, {
            params: {
                json: JSON.stringify({pageNumber, pageSize}),
            },
        });
        if (isSuccessful)
        {
            return data!;
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.log(e);
        message.error('网络异常');
        return null;
    }
}

export async function add(todo: Omit<Todo, 'id'>): Promise<true | null>
{
    try
    {
        const {data: {isSuccessful, message: msg}}: AxiosResponse<Response<void>> =
            await axios.post(ADD, todo);
        if (isSuccessful)
        {
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.log(e);
        message.error('网络异常');
        return null;
    }
}

export async function deleteById(id: number): Promise<true | null>
{
    try
    {
        const {data: {isSuccessful, message: msg}}: AxiosResponse<Response<void>> =
            await axios.post(DELETE_BY_ID, {id});
        if (isSuccessful)
        {
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.log(e);
        message.error('网络异常');
        return null;
    }
}

export async function modify(todo: Pick<Todo, 'id'> & Partial<Pick<Todo, 'title' | 'description'>>): Promise<true | null>
{
    try
    {
        const {data: {isSuccessful, message: msg}}: AxiosResponse<Response<void>> =
            await axios.post(MODIFY, todo);
        if (isSuccessful)
        {
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.log(e);
        message.error('网络异常');
        return null;
    }
}

export async function switchState(id: number, done: boolean): Promise<true | null>
{
    try
    {
        const {data: {isSuccessful, message: msg}}: AxiosResponse<Response<void>> =
            await axios.post(SWITCH_STATE, {id, done});
        if (isSuccessful)
        {
            return true;
        }
        else
        {
            message.warning(msg);
            return null;
        }
    }
    catch (e)
    {
        console.log(e);
        message.error('网络异常');
        return null;
    }
}