// Насколько я знаю у нас существуют следующие роли:

// Менеджер ОПП
// Сотрудник ОП
// Ипотечный менеджер
// Руководитель управления продаж
// Начальник отдела продаж
// Администратор (агентства)
// Менеджер (офиса)
// Агент

// Сейчас я тебе по-порядку для каждой из них отправлю ответы с бэка после успешной авторизации
// Сначала идет запрос auth/me, затем либо merchant-manager/me (для первых пяти ролей) либо agent/me (для остальных)

// Пожалуйста, для всех них составь мне сущность юзера, которая будет лежать в папке src/entities/user (react-typescript)
// нужен максимально грамотный подход уровня senior, для легкой расширяемости и используемости по всему приложению

// bataevdy@fsk.ru
// bbbbb@ya.ru
// 223@gmail.com
// ksjdfejnfk3hrifh@dsdf.ru
// nop@fsk.ru
// dog-idifale75@inbox.ru
// hh312312hhh@sadasd.ru
// ara@gmail.com

// 1.
// {
//     "exp": 1766343473,
//     "iat": 1766339273,
//     "jti": "80dfca85-71c3-4f3d-9216-e0b8f0535d9f",
//     "iss": "https://keycloak.stage.agent.fsk-tech.ru/realms/stage-agent",
//     "aud": "account",
//     "sub": "1d879561-6bc9-4be3-a795-d550273e2eb0",
//     "typ": "Bearer",
//     "azp": "stage-agent",
//     "session_state": "2e8f6ccd-c71a-42da-b33a-d93bbdc80762",
//     "acr": "1",
//     "allowed-origins": [
//         "http://localhost:8180"
//     ],
//     "realm_access": {
//         "roles": [
//             "default-roles-stage-agent",
//             "offline_access",
//             "uma_authorization",
//             "merchant_manager"
//         ]
//     },
//     "resource_access": {
//         "account": {
//             "roles": [
//                 "manage-account",
//                 "manage-account-links",
//                 "view-profile"
//             ]
//         }
//     },
//     "scope": "profile email",
//     "sid": "2e8f6ccd-c71a-42da-b33a-d93bbdc80762",
//     "email_verified": false,
//     "preferred_username": "bataevdy@fsk.ru",
//     "email": "bataevdy@fsk.ru",
//     "role": "merchant_manager",
//     "profileId": 751
// }
// {
//     "id": 1,
//     "merchantId": 1,
//     "profileId": 751,
//     "description": "Merchant Manager",
//     "role": "merchant_manager",
//     "position": "CEO OF CEOSss",
//     "getActNotice": true,
//     "territoryCode": 102,
//     "createdAt": "2024-04-19T16:36:51.840Z",
//     "updatedAt": "2025-12-17T17:44:30.471Z",
//     "profile": {
//         "email": "bataevdy@fsk.ru",
//         "firstName": "Merchant Manager",
//         "lastName": "",
//         "middleName": "",
//         "phone": "79951333765",
//         "telegramUserId": null,
//         "createdAt": "2024-04-19T16:36:51.837Z",
//         "photo": {
//             "id": 1208,
//             "key": "832fd555-d07d-4869-9a9c-b24d5e53600d",
//             "fileName": "photo_2025-03-16_18-14-30.jpg",
//             "public": true,
//             "type": "jpg",
//             "shrinkedKey": "832fd555-d07d-4869-9a9c-b24d5e53600d.shrinked",
//             "missing": false,
//             "createdAt": "2025-07-18T20:00:14.520Z",
//             "updatedAt": "2025-07-20T02:30:04.632Z",
//             "downloadUrl": "https://s3.stage.agent.fsk-tech.ru/localpublic/832fd555-d07d-4869-9a9c-b24d5e53600d?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=minio_access_key%2F20251221%2Fru-1%2Fs3%2Faws4_request&X-Amz-Date=20251221T174753Z&X-Amz-Expires=300&X-Amz-Signature=beaf28cad4b5a2b70f6e0e4da7e2df44236ad09253a529f2ed1771ae8d621e38&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%2A%3DUTF-8%27%27photo_2025-03-16_18-14-30.jpg&x-id=GetObject"
//         }
//     }
// }

// 2.
// {
//     "exp": 1766343519,
//     "iat": 1766339319,
//     "jti": "c445d108-595f-4047-815b-e62a1175e7ff",
//     "iss": "https://keycloak.stage.agent.fsk-tech.ru/realms/stage-agent",
//     "aud": "account",
//     "sub": "376d6fce-2700-4489-904e-ffb68a852322",
//     "typ": "Bearer",
//     "azp": "stage-agent",
//     "session_state": "eb476e3f-bfbc-472a-b588-ec7cc9e2172e",
//     "acr": "1",
//     "allowed-origins": [
//         "http://localhost:8180"
//     ],
//     "realm_access": {
//         "roles": [
//             "default-roles-stage-agent",
//             "offline_access",
//             "uma_authorization",
//             "merchant_sales_manager"
//         ]
//     },
//     "resource_access": {
//         "account": {
//             "roles": [
//                 "manage-account",
//                 "manage-account-links",
//                 "view-profile"
//             ]
//         }
//     },
//     "scope": "profile email",
//     "sid": "eb476e3f-bfbc-472a-b588-ec7cc9e2172e",
//     "email_verified": false,
//     "preferred_username": "bbbbb@ya.ru",
//     "email": "bbbbb@ya.ru",
//     "role": "merchant_sales_manager",
//     "profileId": 1676
// }
// {
//     "id": 139,
//     "merchantId": 116,
//     "profileId": 1676,
//     "description": "",
//     "role": "merchant_sales_manager",
//     "position": "b",
//     "getActNotice": false,
//     "territoryCode": null,
//     "createdAt": "2025-12-11T10:34:02.772Z",
//     "updatedAt": "2025-12-11T10:34:02.772Z",
//     "profile": {
//         "email": "bbbbb@ya.ru",
//         "firstName": "b b b",
//         "lastName": "",
//         "middleName": "",
//         "phone": "545454545454",
//         "telegramUserId": null,
//         "createdAt": "2025-12-11T10:34:02.768Z",
//         "photo": null
//     }
// }

// 3.
// {
//     "exp": 1766343550,
//     "iat": 1766339350,
//     "jti": "03091dfa-fb34-4d83-bcb0-52eaa2c9140c",
//     "iss": "https://keycloak.stage.agent.fsk-tech.ru/realms/stage-agent",
//     "aud": "account",
//     "sub": "943bb833-4732-4f0f-a43e-52a9f7ce0857",
//     "typ": "Bearer",
//     "azp": "stage-agent",
//     "session_state": "b8bf1919-da4c-4608-b174-5fdd3661ae92",
//     "acr": "1",
//     "allowed-origins": [
//         "http://localhost:8180"
//     ],
//     "realm_access": {
//         "roles": [
//             "default-roles-stage-agent",
//             "offline_access",
//             "uma_authorization",
//             "mortgage_manager"
//         ]
//     },
//     "resource_access": {
//         "account": {
//             "roles": [
//                 "manage-account",
//                 "manage-account-links",
//                 "view-profile"
//             ]
//         }
//     },
//     "scope": "profile email",
//     "sid": "b8bf1919-da4c-4608-b174-5fdd3661ae92",
//     "email_verified": false,
//     "preferred_username": "223@gmail.com",
//     "email": "223@gmail.com",
//     "role": "mortgage_manager",
//     "profileId": 1672
// }
// {
//     "id": 135,
//     "merchantId": 128,
//     "profileId": 1672,
//     "description": "",
//     "role": "mortgage_manager",
//     "position": "12345",
//     "getActNotice": false,
//     "territoryCode": null,
//     "createdAt": "2025-12-10T12:41:01.538Z",
//     "updatedAt": "2025-12-10T12:41:01.538Z",
//     "profile": {
//         "email": "223@gmail.com",
//         "firstName": "husky",
//         "lastName": "",
//         "middleName": "",
//         "phone": "12312312289",
//         "telegramUserId": null,
//         "createdAt": "2025-12-10T12:41:01.529Z",
//         "photo": null
//     }
// }

// 4.
// {
//     "exp": 1766343579,
//     "iat": 1766339379,
//     "jti": "a79708c2-2512-421c-9e97-e3ed31251dc5",
//     "iss": "https://keycloak.stage.agent.fsk-tech.ru/realms/stage-agent",
//     "aud": "account",
//     "sub": "f6787b6d-07a4-4df3-a7bb-1f067532502c",
//     "typ": "Bearer",
//     "azp": "stage-agent",
//     "session_state": "6a835a46-650a-48dd-8dbb-1c57c3d5efd7",
//     "acr": "1",
//     "allowed-origins": [
//         "http://localhost:8180"
//     ],
//     "realm_access": {
//         "roles": [
//             "default-roles-stage-agent",
//             "offline_access",
//             "sales_dept_manager",
//             "uma_authorization"
//         ]
//     },
//     "resource_access": {
//         "account": {
//             "roles": [
//                 "manage-account",
//                 "manage-account-links",
//                 "view-profile"
//             ]
//         }
//     },
//     "scope": "profile email",
//     "sid": "6a835a46-650a-48dd-8dbb-1c57c3d5efd7",
//     "email_verified": false,
//     "preferred_username": "ksjdfejnfk3hrifh@dsdf.ru",
//     "email": "ksjdfejnfk3hrifh@dsdf.ru",
//     "role": "sales_dept_manager",
//     "profileId": 1659
// }
// {
//     "id": 130,
//     "merchantId": 100,
//     "profileId": 1659,
//     "description": "",
//     "role": "sales_dept_manager",
//     "position": "",
//     "getActNotice": false,
//     "territoryCode": null,
//     "createdAt": "2025-11-30T15:12:42.394Z",
//     "updatedAt": "2025-11-30T16:23:33.868Z",
//     "profile": {
//         "email": "ksjdfejnfk3hrifh@dsdf.ru",
//         "firstName": "ввауаукау",
//         "lastName": "",
//         "middleName": "",
//         "phone": "678987678987898",
//         "telegramUserId": null,
//         "createdAt": "2025-11-30T15:12:42.388Z",
//         "photo": null
//     }
// }

// 5.
// {
//     "exp": 1766343613,
//     "iat": 1766339413,
//     "jti": "86bbec6b-88f8-4138-9a69-9424313f5afe",
//     "iss": "https://keycloak.stage.agent.fsk-tech.ru/realms/stage-agent",
//     "aud": "account",
//     "sub": "674a5324-d67a-4580-981f-275d02fb7fd4",
//     "typ": "Bearer",
//     "azp": "stage-agent",
//     "session_state": "0ffc997e-48b6-4ee4-9b0d-d4fae71999d8",
//     "acr": "1",
//     "allowed-origins": [
//         "http://localhost:8180"
//     ],
//     "realm_access": {
//         "roles": [
//             "default-roles-stage-agent",
//             "offline_access",
//             "head_of_sales",
//             "uma_authorization"
//         ]
//     },
//     "resource_access": {
//         "account": {
//             "roles": [
//                 "manage-account",
//                 "manage-account-links",
//                 "view-profile"
//             ]
//         }
//     },
//     "scope": "profile email",
//     "sid": "0ffc997e-48b6-4ee4-9b0d-d4fae71999d8",
//     "email_verified": false,
//     "preferred_username": "nop@fsk.ru",
//     "email": "nop@fsk.ru",
//     "role": "head_of_sales",
//     "profileId": 1673
// }
// {
//     "id": 136,
//     "merchantId": 128,
//     "profileId": 1673,
//     "description": "",
//     "role": "head_of_sales",
//     "position": "нормальный чувак вообще",
//     "getActNotice": false,
//     "territoryCode": null,
//     "createdAt": "2025-12-10T14:55:45.926Z",
//     "updatedAt": "2025-12-10T14:55:45.926Z",
//     "profile": {
//         "email": "nop@fsk.ru",
//         "firstName": "Клепа Шлепа Ноп",
//         "lastName": "",
//         "middleName": "",
//         "phone": "13372281234",
//         "telegramUserId": null,
//         "createdAt": "2025-12-10T14:55:45.920Z",
//         "photo": null
//     }
// }

// 6.
// {
//     "exp": 1766343638,
//     "iat": 1766339438,
//     "jti": "2e032139-ec15-45d2-bc2f-de05fe23ec26",
//     "iss": "https://keycloak.stage.agent.fsk-tech.ru/realms/stage-agent",
//     "aud": "account",
//     "sub": "71d89d2b-ece6-4be3-ba8c-756997782834",
//     "typ": "Bearer",
//     "azp": "stage-agent",
//     "session_state": "207041f8-60af-4a44-b767-01303def849b",
//     "acr": "1",
//     "allowed-origins": [
//         "http://localhost:8180"
//     ],
//     "realm_access": {
//         "roles": [
//             "default-roles-stage-agent",
//             "offline_access",
//             "agency_admin",
//             "uma_authorization"
//         ]
//     },
//     "resource_access": {
//         "account": {
//             "roles": [
//                 "manage-account",
//                 "manage-account-links",
//                 "view-profile"
//             ]
//         }
//     },
//     "scope": "profile email",
//     "sid": "207041f8-60af-4a44-b767-01303def849b",
//     "email_verified": false,
//     "preferred_username": "dog-idifale75@inbox.ru",
//     "email": "dog-idifale75@inbox.ru",
//     "role": "agency_admin",
//     "profileId": 1683
// }
// {
//     "id": 1438,
//     "additionalPhone": null,
//     "description": null,
//     "role": "agency_admin",
//     "position": "авпв",
//     "profileId": 1683,
//     "branchId": 1241,
//     "createdAt": "2025-12-18T08:57:58.149Z",
//     "updatedAt": "2025-12-18T08:57:58.149Z",
//     "branch": {
//         "id": 1241,
//         "name": "Главный офис",
//         "address": "",
//         "agencyId": 1115,
//         "createdAt": "2025-12-18T08:57:58.128Z",
//         "updatedAt": "2025-12-18T08:57:58.128Z",
//         "agency": {
//             "id": 1115,
//             "name": "2ЮЛ изначально",
//             "categoryId": 4,
//             "email": "dog-idifale75@inbox.ru",
//             "address": "авр",
//             "blockType": "unblock",
//             "postAddress": null,
//             "legalAddress": null,
//             "externalEmails": [],
//             "postIsMainAddress": false,
//             "merchantManagerId": 117,
//             "createdAt": "2025-12-18T08:57:58.121Z",
//             "updatedAt": "2025-12-18T08:57:58.121Z"
//         }
//     },
//     "profile": {
//         "id": 1683,
//         "email": "dog-idifale75@inbox.ru",
//         "firstName": "цуе вап. вв",
//         "lastName": null,
//         "middleName": null,
//         "phone": "75676757026",
//         "isDeleted": false,
//         "telegramUserId": null,
//         "fileId": null,
//         "createdAt": "2025-12-18T08:57:58.142Z",
//         "updatedAt": "2025-12-18T13:12:06.858Z",
//         "photo": null
//     }
// }

// 7.
// {
//     "exp": 1766343671,
//     "iat": 1766339471,
//     "jti": "060c25f8-b2a2-429e-bb8e-d07b24d91218",
//     "iss": "https://keycloak.stage.agent.fsk-tech.ru/realms/stage-agent",
//     "aud": "account",
//     "sub": "61ea1ce6-6b13-4f0d-9b8a-4dd1782dc216",
//     "typ": "Bearer",
//     "azp": "stage-agent",
//     "session_state": "e28b1446-e67c-4b6c-a68f-0b06c7bb2570",
//     "acr": "1",
//     "allowed-origins": [
//         "http://localhost:8180"
//     ],
//     "realm_access": {
//         "roles": [
//             "default-roles-stage-agent",
//             "manager_branch",
//             "offline_access",
//             "uma_authorization"
//         ]
//     },
//     "resource_access": {
//         "account": {
//             "roles": [
//                 "manage-account",
//                 "manage-account-links",
//                 "view-profile"
//             ]
//         }
//     },
//     "scope": "profile email",
//     "sid": "e28b1446-e67c-4b6c-a68f-0b06c7bb2570",
//     "email_verified": false,
//     "preferred_username": "sadasdasd@sadasd.ru",
//     "email": "hh312312hhh@sadasd.ru",
//     "role": "manager_branch",
//     "profileId": 767
// }
// {
//     "id": 754,
//     "additionalPhone": "444444444444",
//     "description": null,
//     "role": "manager_branch",
//     "position": "аыфаф",
//     "profileId": 767,
//     "branchId": 1,
//     "createdAt": "2024-05-03T09:17:53.145Z",
//     "updatedAt": "2024-07-02T15:32:18.428Z",
//     "branch": {
//         "id": 1,
//         "name": "Главный офис",
//         "address": "",
//         "agencyId": 1,
//         "createdAt": "2024-04-19T16:35:18.667Z",
//         "updatedAt": "2024-04-19T16:35:18.667Z",
//         "agency": {
//             "id": 1,
//             "name": "My Moscow",
//             "categoryId": 2,
//             "email": "4360009@gmail.com",
//             "address": "8134",
//             "blockType": "unblock",
//             "postAddress": "",
//             "legalAddress": "г Москва, ул Ферганская, д 25",
//             "externalEmails": [],
//             "postIsMainAddress": false,
//             "merchantManagerId": 99,
//             "createdAt": "2024-04-19T16:35:18.664Z",
//             "updatedAt": "2025-10-17T07:41:32.007Z"
//         }
//     },
//     "profile": {
//         "id": 767,
//         "email": "hh312312hhh@sadasd.ru",
//         "firstName": "     321312321          ",
//         "lastName": "",
//         "middleName": "",
//         "phone": "74447903312",
//         "isDeleted": false,
//         "telegramUserId": null,
//         "fileId": null,
//         "createdAt": "2024-05-03T09:17:53.137Z",
//         "updatedAt": "2024-07-02T15:32:18.425Z",
//         "photo": null
//     }
// }

// 8.
// {
//     "exp": 1766343694,
//     "iat": 1766339494,
//     "jti": "84dc4770-c90e-46ec-8f3c-35c106098b96",
//     "iss": "https://keycloak.stage.agent.fsk-tech.ru/realms/stage-agent",
//     "aud": "account",
//     "sub": "b7d77b27-7c39-455c-9bf9-d788d80bfec0",
//     "typ": "Bearer",
//     "azp": "stage-agent",
//     "session_state": "0c3f59d6-08f2-4008-8168-8402cedb59ed",
//     "acr": "1",
//     "allowed-origins": [
//         "http://localhost:8180"
//     ],
//     "realm_access": {
//         "roles": [
//             "agent",
//             "default-roles-stage-agent",
//             "offline_access",
//             "uma_authorization"
//         ]
//     },
//     "resource_access": {
//         "account": {
//             "roles": [
//                 "manage-account",
//                 "manage-account-links",
//                 "view-profile"
//             ]
//         }
//     },
//     "scope": "profile email",
//     "sid": "0c3f59d6-08f2-4008-8168-8402cedb59ed",
//     "email_verified": false,
//     "preferred_username": "ara@gmail.com",
//     "email": "ara@gmail.com",
//     "role": "agent",
//     "profileId": 1120
// }
// {
//     "id": 1033,
//     "additionalPhone": null,
//     "description": null,
//     "role": "agent",
//     "position": "dfdf",
//     "profileId": 1120,
//     "branchId": 1,
//     "createdAt": "2024-06-24T11:59:37.091Z",
//     "updatedAt": "2024-06-24T11:59:37.091Z",
//     "branch": {
//         "id": 1,
//         "name": "Главный офис",
//         "address": "",
//         "agencyId": 1,
//         "createdAt": "2024-04-19T16:35:18.667Z",
//         "updatedAt": "2024-04-19T16:35:18.667Z",
//         "agency": {
//             "id": 1,
//             "name": "My Moscow",
//             "categoryId": 2,
//             "email": "4360009@gmail.com",
//             "address": "8134",
//             "blockType": "unblock",
//             "postAddress": "",
//             "legalAddress": "г Москва, ул Ферганская, д 25",
//             "externalEmails": [],
//             "postIsMainAddress": false,
//             "merchantManagerId": 99,
//             "createdAt": "2024-04-19T16:35:18.664Z",
//             "updatedAt": "2025-10-17T07:41:32.007Z"
//         }
//     },
//     "profile": {
//         "id": 1120,
//         "email": "ara@gmail.com",
//         "firstName": "Арара",
//         "lastName": "",
//         "middleName": "",
//         "phone": "79161616174",
//         "isDeleted": false,
//         "telegramUserId": null,
//         "fileId": null,
//         "createdAt": "2024-06-24T11:59:37.087Z",
//         "updatedAt": "2024-06-24T11:59:37.087Z",
//         "photo": null
//     }
// }
