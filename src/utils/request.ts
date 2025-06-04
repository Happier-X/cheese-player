import { ClientOptions, fetch } from '@tauri-apps/plugin-http'
import { Store } from '@tauri-apps/plugin-store'
import { MD5 } from 'crypto-js'

/**
 * 普通请求
 */
const request = (
    url: URL | Request | string,
    options: RequestInit & ClientOptions
) => {
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.json())
                } else {
                    reject(
                        new Error(
                            `Request failed with status code ${response.status}`
                        )
                    )
                }
            })
            .catch((error) => {
                reject(error)
            })
    })
}

interface mediaServer {
    url: string
    username: string
    password: string
}

interface SubsonicRequestOptions {
    url: URL | Request | string
    params?: object
    options?: RequestInit & ClientOptions
    getOriginalURL?: boolean
}

/**
 * Subsonic请求
 */
const subsonicRequest = async ({
    url,
    params = {},
    options = {},
    getOriginalURL = false
}: SubsonicRequestOptions) => {
    const settingsStore = await Store.load('store.settings')
    let mediaServer: mediaServer = (await settingsStore.get('mediaServer')) || {
        url: '',
        username: '',
        password: ''
    }
    const commonParams = {
        u: mediaServer?.username || '',
        t: MD5(`${mediaServer?.password}cheese`).toString() || '',
        s: 'cheese',
        v: '1.16.1',
        c: 'cheese',
        f: 'json'
    } as Record<string, string>
    const subsonicUrl = params
        ? `${mediaServer?.url}${url}?${new URLSearchParams({
              ...commonParams,
              ...params
          })}`
        : `${mediaServer?.url}${url}?${new URLSearchParams(commonParams)}`
    if (getOriginalURL) {
        return subsonicUrl
    } else {
        return new Promise((resolve, reject) => {
            fetch(subsonicUrl, options)
                .then(async (response) => {
                    if (response.status === 200) {
                        resolve((await response.json())['subsonic-response'])
                    } else {
                        reject(
                            new Error(
                                `Request failed with status code ${response.status}`
                            )
                        )
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}

export { request, subsonicRequest }
