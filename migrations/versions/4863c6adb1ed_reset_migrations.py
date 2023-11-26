"""Reset migrations

Revision ID: 4863c6adb1ed
Revises: 4c70f338eff9
Create Date: 2023-11-21 13:35:58.617969

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4863c6adb1ed'
down_revision = '4c70f338eff9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_file', sa.String(length=20), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('image_file')

    # ### end Alembic commands ###
