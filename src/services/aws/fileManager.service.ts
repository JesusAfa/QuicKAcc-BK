import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { HttpException, Injectable, Scope } from '@nestjs/common';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { envs } from '@app/config/envs';
import { base64ToArrayBuffer } from '@app/common/utils';

@Injectable({ scope: Scope.REQUEST })
export class FileManager {
  /**
   * Se conecta a AWS3 con las credenciales pertinentes
   * @version 0.0.1
   * @return {boolean} la conexión
   */
  AWS3() {
    return new S3Client({
      region: envs.AWS_REGION,
      credentials: {
        accessKeyId: envs.AWS_ACCESS_KEY,
        secretAccessKey: envs.AWS_SECRET_KEY,
      },
    });
  }
  /**
   * uploadFileS3
   * @param url end point
   * @param config request config
   * @returns
   */
  async uploadFileS3(base64: string, route: string) {
    const S3 = this.AWS3();

    const ArrayBuffer = base64ToArrayBuffer(base64);

    const buffer = Buffer.from(ArrayBuffer);

    const uploadParams = {
      Bucket: envs.AWS_BUCKET,
      Key: route,
      Body: buffer,
    };
    try {
      const response = await S3.send(new PutObjectCommand(uploadParams));

      return response;
    } catch (error) {
      throw new HttpException(
        `Error al subir archivo: ${error?.message || ''}`,
        error?.status || 500,
      );
    }
  }

  /**
   * getFileUrlS3
   * @param Key
   * @param exp
   * @returns
   */
  getFileUrlS3 = async (Key: string, exp?: number): Promise<string> => {
    const S3 = this.AWS3();
    const command = new GetObjectCommand({
      Bucket: envs.AWS_BUCKET,
      Key,
    });

    return await getSignedUrl(S3, command, {
      ...(exp ? { expiresIn: exp } : {}),
    });
  };
}
