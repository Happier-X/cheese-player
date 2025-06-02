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

interface mediaLibraryServer {
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
    const settingStore = await Store.load('store.setting')
    let mediaLibraryServer: mediaLibraryServer = (await settingStore.get(
        'mediaLibraryServer'
    )) || {
        url: '',
        username: '',
        password: ''
    }
    const commonParams = {
        u: mediaLibraryServer?.username || '',
        t: MD5(`${mediaLibraryServer?.password}cheese`).toString() || '',
        s: 'cheese',
        v: '1.16.1',
        c: 'cheese',
        f: 'json'
    } as Record<string, string>
    const subsonicUrl = params
        ? `${mediaLibraryServer?.url}${url}?${new URLSearchParams({
              ...commonParams,
              ...params
          })}`
        : `${mediaLibraryServer?.url}${url}?${new URLSearchParams(commonParams)}`
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
